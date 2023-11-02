<?php

namespace Controllers;

use Models as M;

class checkAuth
{
    public static function init()
    {
        $sessions = new M\Sessions;

        $auth = $sessions->exists();

        return json_encode([
            'auth' => $auth,
            'data' => $auth ? getUserData('id, nick, recipient_name') : []
        ]);
    }
}

?>