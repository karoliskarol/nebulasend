<?php

declare(strict_types=1);

header("Content-Type: application/json");

date_default_timezone_set('Europe/Vilnius');

$headers = getallheaders();

if (!(array_key_exists('http_x_requested_with', $headers) and $headers['http_x_requested_with'] === 'xmlhttprequest')) {
    http_response_code(403);
    exit(
        json_encode(
            (object) array(
                'stat' => false,
                'error' => 'Something went wrong.'
            )
        )
    );
}


$rm = $_SERVER['REQUEST_METHOD'];

if ($rm === 'PUT' OR $rm === 'DELETE') {
    $requestData = file_get_contents('php://input');
    $decodedData = json_decode($requestData, true);

    if ($rm === 'PUT') {
        define('PUT', $decodedData);
    } elseif ($rm === 'DELETE') {
        define('DELETE', $decodedData);
    }
}

?>