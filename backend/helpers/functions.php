<?php

function hasKeys($requiredKeys, $post)
{
    $postKeys = array_keys($post);
    $intersect = array_intersect($requiredKeys, $postKeys);

    $postKeysC = count($postKeys);

    if ($postKeysC === count($intersect) and $postKeysC === count($requiredKeys)) {
        return true;
    }

    return false;
}

function validatePost($requiredKeys, $err = 'Something went wrong.')
{
    if (!hasKeys($requiredKeys, $_POST)) {
        throw new \Exception($err);
    }
}

function validatePut($requiredKeys, $err = 'Something went wrong.')
{
    if (!hasKeys($requiredKeys, PUT)) {
        throw new \Exception($err);
    }
}

function validateDelete($requiredKeys, $err = 'Something went wrong.')
{
    if (!hasKeys($requiredKeys, DELETE)) {
        throw new \Exception($err);
    }
}

function validateLength($string, $min, $max, $name)
{
    $l = strlen($string);
    $bool = $l < $min or $l > $max;

    if ($bool) {
        throw new \Exception("The $name is either too short or too long. It should be between $min and $max characters in length.");
    }
}

function validateIsEmpty($string, $name)
{
    if (empty($string)) {
        throw new \Exception("$name can't be empty.");
    }
}

function generateString($length = 8)
{
    $string = "";
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for ($i = 0; $i < $length; $i++) {
        $string .= $chars[mt_rand(0, strlen($chars) - 1)];
    }

    return $string;
}

function validatePasswordsMatching($pass, $rpass): void
{
    if ($pass !== $rpass) {
        throw new \Exception("Password's don't match.");
    }
}

function validatePasswordFormat($pass): void
{
    $hasNumbers = preg_match('#[0-9]#', $pass);
    $hasUpperLetters = preg_match('#[A-Z]#', $pass);
    $hasSpecialSymbols = preg_match('/[^a-zA-Z0-9]/', $pass);

    if (!($hasNumbers and $hasUpperLetters and $hasSpecialSymbols)) {
        throw new \Exception("For security purposes, the password field must contain at least one uppercase character, one number, and one special character.");
    }
}

function validateIsPasswordCorrect($nick, $pass, $users): void
{
    if (!password_verify($pass, $users->fetchColumnByNick('pass', $nick))) {
        throw new \Exception("Wrong password.");
    }
}

?>