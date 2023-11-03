<?php

namespace Controllers\Auth;

use Models as M;

class LogOut
{
    public static function init()
    {
        try {
            validateAuth();

            $sessions = new M\Sessions;

            $sessions->deleteSpecific();

            return json_encode(
                (object) array(
                    'stat' => true,
                    'text' => 'Logged out of account successfuly.'
                )
            );
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }
}

?>