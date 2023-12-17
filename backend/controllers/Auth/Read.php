<?php

namespace Controllers\Auth;

use Models as M;

class Read
{
    public static function init()
    {
        try {
            validateAuth();

            $emailsMessages = new M\EmailsMessages;

            $id = isset($_GET['id']) ? $_GET['id'] : '';

            validateRecordBelonging($emailsMessages->fetchUserId($id), null);
            $read = $emailsMessages->fetchById($id);

            self::validateExec($read);

            return json_encode(
                (object) array(
                    'stat' => true,
                    'message' => $read
                )
            );
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    public static function validateExec(mixed $read) {
        if(!$read) {
            throw new \Exception("There's no message with this id.");
        }
    }
}

?>