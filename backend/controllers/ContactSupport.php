<?php

namespace Controllers;

use Models as M;

class ContactSupport
{
    public static function init()
    {
        try {
            validatePost(['name', 'email', 'message']);

            $users = new M\Users;

            $name = $_POST['name'];
            $email = $_POST['email'];
            $message = $_POST['message'];

            validateLength($name, 2, 100, 'Full name');
            validateIsEmpty($message, 'Message');
            self::validateAmountOfAttempts();
            self::validateEmail($email);

            echo self::success($name, $email, $message);
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function validateEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Wrong email adress.");
        }
    }

    private static function validateAmountOfAttempts()
    {
        validateAmountOfAttempts(
            new M\Attempts,
            'contacts',
            86400,
            2,
            'Too many attempts. Try next day.'
        );
    }

    private static function success(string $name, string $email, string $message): string
    {
        $emailsMessages = new M\EmailsMessages;

        $emailsMessages->create([
            'user_id' => CONTACT_ACCOUNT_ID,
            'sent_by' => $email,
            'sent_to' => 'support@nebulasend.com',
            'subject' => 'Contact form',
            'recipient' => $name,
            'message' => $message,
            'summary' => strlen($message) >= 100 ? substr($message, 0, 100) : $message,
            'sent_at' => time()
        ]);

        return json_encode([
            'stat' => true,
            'text' => 'Your message has been sent successfully. You can expect to hear back from us within approximately one day.'
        ]);
    }
}

?>