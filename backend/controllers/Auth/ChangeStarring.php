<?php

namespace Controllers\Auth;

use Models as M;

class ChangeStarring
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

    private static function success(object $emailsMessages, string $id): string
    {
        $emailsMessages->changeStatus('starred=!starred', $id);

        return json_encode([
            'stat' => true,
            'text' => 'Changed starring of message successfully.'
        ]);
    }
}

?>