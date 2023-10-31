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

function validatePost($requiredKeys, $err = 'Something went wrong.') {
    if (!hasKeys($requiredKeys, $_POST)) {
        throw new \Exception($err);
    }
}

function validateLength($string, $min, $max, $name)
{
    $l = strlen($string);
    $bool = $l < $min or $l > $max;

    if($bool) {
        throw new \Exception("The $name is either too short or too long. It should be between $min and $max characters in length.");
    } 
}

function validateIsEmpty($string, $name) {
    if(empty($string)) {
        throw new \Exception("$name can't be empty.");
    }
}

function generateString($length = 8) {
    $string = "";
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for ($i = 0; $i < $length; $i++) {
        $string .= $chars[mt_rand(0, strlen($chars) -1)];
    }

    return $string;
}

?>