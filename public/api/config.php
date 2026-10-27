<?php
// ============================================================
//  Contact form settings.
//  Don't edit this file on the host — create config.local.php next to it
//  (see DEPLOY.md). Uploading a new version of the site never touches that file.
// ============================================================
$defaults = [
    // where new messages are emailed
    'to' => 'hello@chartagh.agency',

    // sender address; empty = no-reply@<your domain>
    // (an address on your own domain keeps mail out of spam)
    'from' => '',

    // send through a mailbox on the domain (needed when the host blocks mail()).
    // Leave user/pass empty to use PHP mail(). Port 465 = SSL, 587 = STARTTLS.
    'smtp_host' => 'mail.chartagh.agency',
    'smtp_port' => 465,
    'smtp_user' => '',
    'smtp_pass' => '',

    // every message is also saved here, so nothing is lost if email fails
    'data_dir' => __DIR__ . '/_data',

    // messages allowed per visitor per hour
    'max_per_hour' => 5,
];

$local = __DIR__ . '/config.local.php';
return is_file($local) ? array_merge($defaults, (array) require $local) : $defaults;
