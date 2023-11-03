<?php

namespace Controllers\Auth;

use Models as M;

class DeleteMessage
{
    public static function init()
    {
        try {
            validateDelete(['id']);
            validateAuth();

            $id = DELETE['id'];

            $emailsMessages = new M\EmailsMessages;
            
            validateRecordBelonging($emailsMessages->fetchUserId($id), null);

            echo self::success($emailsMessages, $id);
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function success(object $emailMessages, string $id) {
        $emailMessages->deleteMessage($id);

        return json_encode([
            'stat' => true,
            'text' => 'Delete this email message successfully.'
        ]);
    }
}

?>