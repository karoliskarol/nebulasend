<?php

spl_autoload_register(function ($class) {
    if (!DEV_MODE) {
        $class = str_replace('\\', '/', $class);
    }

    include_once $class . ".php";
}, true);

?>