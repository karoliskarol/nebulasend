<?php

namespace Controllers;

use Models as M;

class checkAuth
{
    public static function init()
    {
        $sessions = new M\Sessions;

        return json_encode((object) array(
            'auth' => $sessions->exists()
        ));
    }
}

?>