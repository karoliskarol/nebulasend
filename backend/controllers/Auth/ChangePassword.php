<?php

namespace Controllers\Auth;

use Models as M;

class ChangePassword
{
    public static function init()
    {
        try {
            validatePut(['cpass','pass', 'rpass']);
            preventIfNotAuth();

            $users = new M\Users;

            $cpass = PUT['cpass'];
            $pass = PUT['pass'];
            $rpass = PUT['rpass'];

            $data = getUserData('id, nick');

            validateIsPasswordCorrect($data['nick'], $cpass, $users);
            validateLength($pass, 8, 50, 'password');
            validatePasswordsMatching($pass, $rpass);
            validatePasswordFormat($pass);

            self::validateOldNewPasswords($cpass, $pass);

            self::changePass($data['id'], $pass, $users);
            echo self::success();
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function validateOldNewPasswords(string $cpass, string $pass) {
        if($cpass === $pass) {
            throw new \Exception("New password can't be exactly the same as the old one.");
        }
    }

    private static function changePass(string $id, string $pass, object $users) {
        $hashedPass = password_hash($pass, PASSWORD_BCRYPT);

        $users->updatePassword($id, $hashedPass);
    }

    private static function success() {
        return json_encode([
            'stat' => true,
            'text' => 'Password changed successfully.'
        ]);
    }
}


?>