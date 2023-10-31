<?php

declare(strict_types=1);

header("Content-Type: application/json");

date_default_timezone_set('Europe/Vilnius');

$headers = getallheaders();

if (!(array_key_exists('http_x_requested_with', $headers) and $headers['http_x_requested_with'] === 'xmlhttprequest')) {
    http_response_code(403);
    exit(json_encode((object) array(
        'stat' => false,
        'error' => 'Something went wrong.'
    )
    ));
}

?>