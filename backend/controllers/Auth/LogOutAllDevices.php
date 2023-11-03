<?php

namespace Controllers\Auth;

use Models as M;

class LogOutAllDevices
{
    public static function init()
    {
        try {
            validateAuth();

            $sessions = new M\Sessions;

            $sessions->deleteAllOfUser(getUserData('id')['id']);

            return json_encode(
                (object) array(
                    'stat' => true,
                    'text' => 'Logged out of all devices successfuly.'
                )
            );
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }
}

?>