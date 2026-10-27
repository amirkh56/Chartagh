<?php
// Contact form endpoint: validates, rate-limits, saves the message and emails it.
// Works on PHP 7.4+ with the standard cPanel mail() setup.
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$config = require __DIR__ . '/config.php';

function reply(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function clean($value, int $max): string
{
    $s = trim(str_replace(["\r", "\0"], '', (string) ($value ?? '')));
    return function_exists('mb_substr') ? mb_substr($s, 0, $max, 'UTF-8') : substr($s, 0, $max * 4);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method']);
}

// only accept posts from our own pages
$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

$data = json_decode((string) file_get_contents('php://input', false, null, 0, 20000), true);
if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'bad_request']);
}

// honeypot: bots fill the hidden field; pretend it worked
if (!empty($data['website'])) {
    reply(200, ['ok' => true]);
}

$name = clean($data['name'] ?? '', 80);
$contact = clean($data['contact'] ?? '', 120);
$message = clean($data['message'] ?? '', 2000);
$budget = clean($data['budget'] ?? '', 40);
$lang = ($data['lang'] ?? 'fa') === 'en' ? 'en' : 'fa';
$services = [];
foreach (array_slice((array) ($data['services'] ?? []), 0, 6) as $s) {
    $services[] = clean($s, 40);
}

if ($name === '' || $contact === '') {
    reply(422, ['ok' => false, 'error' => 'required']);
}

// ---- storage + rate limit
$dir = $config['data_dir'];
if (!is_dir($dir)) {
    @mkdir($dir, 0750, true);
}
$ipKey = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|chartagh');
$limitFile = $dir . '/ratelimit.json';
$fh = @fopen($limitFile, 'c+');
if ($fh && flock($fh, LOCK_EX)) {
    $hits = json_decode((string) stream_get_contents($fh), true) ?: [];
    $now = time();
    foreach ($hits as $k => $times) {
        $hits[$k] = array_values(array_filter((array) $times, fn($t) => $t > $now - 3600));
        if (!$hits[$k]) {
            unset($hits[$k]);
        }
    }
    if (count($hits[$ipKey] ?? []) >= (int) $config['max_per_hour']) {
        flock($fh, LOCK_UN);
        fclose($fh);
        reply(429, ['ok' => false, 'error' => 'rate']);
    }
    $hits[$ipKey][] = $now;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);
}

$entry = [
    'time' => date('c'),
    'lang' => $lang,
    'name' => $name,
    'contact' => $contact,
    'services' => $services,
    'budget' => $budget,
    'message' => $message,
];
$saved = @file_put_contents($dir . '/messages.jsonl', json_encode($entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) !== false;

// ---- email (user input only ever goes in the body; Reply-To only if it is a valid address)
$from = $config['from'] !== '' ? $config['from'] : 'no-reply@' . preg_replace('/^www\./', '', $host);
$subject = '=?UTF-8?B?' . base64_encode('پیام تازه از سایت چارطاق — ' . $name) . '?=';
$body = "نام: {$name}\nراه ارتباطی: {$contact}\nخدمات: " . implode('، ', $services) . "\nبودجه: {$budget}\nزبان صفحه: {$lang}\n\n{$message}\n";
$headers = [
    'From: =?UTF-8?B?' . base64_encode('سایت چارطاق') . "?= <{$from}>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $contact;
}
$mailed = @mail((string) $config['to'], $subject, $body, implode("\r\n", $headers));

if (!$mailed && !$saved) {
    reply(500, ['ok' => false, 'error' => 'server']);
}
reply(200, ['ok' => true, 'mailed' => $mailed]);
