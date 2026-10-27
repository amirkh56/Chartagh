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

    // every message is also saved here, so nothing is lost if email fails
    'data_dir' => __DIR__ . '/_data',

    // messages allowed per visitor per hour
    'max_per_hour' => 5,
];

$local = __DIR__ . '/config.local.php';
return is_file($local) ? array_merge($defaults, (array) require $local) : $defaults;
