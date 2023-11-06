<?php

namespace Controllers;

use Models as M;

class Login
{
    public static function init()
    {
        try {
            validatePost(['nick', 'pass']);

            $users = new M\Users;

            $nick = $_POST['nick'];
            $pass = $_POST['pass'];

            self::validateUserExec($nick, $users);
            self::validateAmountOfAttempts();
            validateIsPasswordCorrect($nick, $pass, $users);

            echo self::success($nick, $users);
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function validateUserExec(string $nick, object $users): void
    {
        if (!$users->exists($nick)) {
            throw new \Exception("User with this nickname does not exist.");
        }
    }

    private static function validateAmountOfAttempts(): void
    {
        validateAmountOfAttempts(
            new M\Attempts,
            'contact',
            300,
            6,
            'Too many login attempts. Try later.'
        );
    }

    private static function success(string $nick, object $users): string
    {
        $ulid = $users->fetchColumnByNick("id", $nick);

        $session = initAuth($ulid);

        return json_encode([
            'stat' => true,
            'session' => $session,
            'text' => 'Login is successfull.'
        ]);
    }
}

?>