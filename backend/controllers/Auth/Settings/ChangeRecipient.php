<?php

namespace Controllers\Auth\Settings;

use Models as M;

class ChangeRecipient
{
    public static function init()
    {
        try {
            validatePut(['name']);
            validateAuth();

            $users = new M\Users;

            $name = PUT['name'];

            $data = getUserData('id, nick');

            self::validateNameFormat($name);
            validateLength($name, 3, 50, 'Recipient nickname');
            self::validateRecipientExec($name, $data['nick'], $users);
        
            echo self::success($name, $data['id'], $users);
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function validateNameFormat(string $name) {
        if (preg_match('/[^a-zA-Z0-9 ]/', $name)) {
            throw new \Exception("Nickname can't contain any special characters. Only numbers and letters.");
        }
    }

    private static function validateRecipientExec(string $name, string $nick, object $users) {
        $nickExec = $users->fetchColumnByNick('nick', strtolower($name));
        $recipientExec = $users->fetchColumnByColumn('id', 'recipient_name', $name);

        if(($nickExec && $nickExec !== $nick) || $recipientExec) {
            throw new \Exception("Your recipient nickname can't be the same as the nickname of another user or the recipient nickname in the system. Or maybe your recipient nickname is already set same as your input.");
        }
    }

    private static function success(string $name, string $id, object $users) {
        $users->updateRecipient($id, $name);

        return json_encode([
            'stat' => true,
            'text' => 'Recipient name changed successfully.'
        ]);
    }
}


?>