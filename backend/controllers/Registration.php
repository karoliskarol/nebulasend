<?php

namespace Controllers;

use Models as M;

class Registration
{
    public static function init()
    {
        try {
            validatePost(['nick', 'pass', 'rpass', 'g-recaptcha-response'], "Something went wrong or ReCAPTCHA failed.");

            $users = new M\Users;

            $nick = strtolower($_POST['nick']);
            $pass = $_POST['pass'];
            $rpass = $_POST['rpass'];

            validateLength($nick, 3, 30, 'nickname');
            validateLength($pass, 8, 50, 'password');

            validatePasswordsMatching($pass, $rpass);
            validatePasswordFormat($pass);
            self::validateNicksFormat($nick);
            self::validateUserExec($nick, $users);

            self::validateRecaptcha();

            $emailPassRandom = generateString();

            self::createEmailAccount($nick, $emailPassRandom);
            echo self::success($nick, $pass, $users, $emailPassRandom);
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function validateNicksFormat(string $nick): void
    {
        if (preg_match('/[^a-z0-9]/', $nick)) {
            throw new \Exception("Nickname can't contain any special characters. Only numbers and letters.");
        }
    }

    private static function validateUserExec(string $nick, object $users): void
    {
        if ($users->exists($nick)) {
            throw new \Exception("User with this nickname already exists.");
        }
    }

    private static function validateRecaptcha()
    {
        $recaptcha = $_POST['g-recaptcha-response'];

        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . RECAPTCHA_SECRET . '&response=' . $recaptcha;
        $response = json_decode(file_get_contents($url));

        if (!$response->success) {
            throw new \Exception("Recaptcha failed.");
        }
    }

    private static function createEmailAccount(string $nick, $emailPassRandom)
    {
        $emailPassword = EMAIL_PASS . $emailPassRandom;
        $emailQuota = 100;

        $post_fields = array(
            'email' => $nick,
            'password' => $emailPassword,
            'quota' => $emailQuota
        );

        $context = stream_context_create(
            array(
                'http' => array(
                    'method' => 'POST',
                    'header' => "Content-Type: application/x-www-form-urlencoded\r\nAuthorization: cpanel ". CP_USER .":". CP_API_KEY ."\n",
                    'content' => http_build_query($post_fields),
                ),
            )
        );

        $result = file_get_contents('https://www.nebulasend.com:2083/cpsess4246573215/execute/Email/add_pop', false, $context);

        if ($result === false) {
            throw new \Exception("Something went wrong while creating an email account for you. Maybe try later.");
        }
    }

    private static function success(string $nick, string $pass, object $users, string $emailPassRandom): string
    {
        $hashedPass = password_hash($pass, PASSWORD_BCRYPT);

        $user = $users->create($nick, $hashedPass, $emailPassRandom);
        $session = initAuth($user->ulid);

        return json_encode(
            (object) array(
                'stat' => true,
                'session' => $session,
                'text' => 'User account was created successfully. Now you can login.'
            )
        );
    }
}

?>