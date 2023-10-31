<?php

namespace Controllers;

use Models as M;
use Helpers;
use Ulid\Ulid;

class Home
{
    public static function init()
    {

        $ulid = Ulid::generate();
        return json_encode((object) array('test' => (string) $ulid));
    }
}

?>