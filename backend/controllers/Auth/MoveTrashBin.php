<?php

namespace Controllers\Auth;

use Models as M;

class MoveTrashBin
{
    public static function init()
    {
        try {
            validatePut(['id']);
            validateAuth();

            $id = PUT['id'];

            $emailsMessages = new M\EmailsMessages;
            
            validateRecordBelonging($emailsMessages->fetchUserId($id), null);

            echo self::success($emailsMessages, $id);
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function success($emailsMessages, $id) {
        $emailsMessages->changeStatus(DEV_MODE ? 'trash=!trash' : 'trash = NOT trash', $id);

        return json_encode([
            'stat' => true,
            'text' => 'Action is successfull.'
        ]);
    }
}

?>