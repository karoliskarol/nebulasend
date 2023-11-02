<?php

namespace Controllers\Auth;

use Models as M;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


class NewMessage
{
    public static function init()
    {
        try {
            validatePost(['to', 'subject', 'message']);
            preventIfNotAuth();

            $to = $_POST['to'];
            $subject = $_POST['subject'];
            $message = $_POST['message'];

            self::validateEmail($to);
            validateLength($subject, 3, 300, 'subject');
            validateIsEmpty($message, 'Message');

            $data = getUserData('id, nick, email_pass, recipient_name');

            $args = [$to, $subject, $message, $data];

            self::sendDevelopment(...$args);
            self::sendProduction(...$args);
            self::createEmail(...$args);

            echo self::success();
        } catch (\Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function validateEmail(string $to): void {
        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("This is not valid email adress.");
          }
    }

    private static function sendDevelopment(string $to, string $subject, string $message, array $data): void
    {
        if(!DEV_MODE) return;

        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'mail.nebulasend.com';
        $mail->SMTPAuth = true;
        $mail->Username = $data['nick'].'@nebulasend.com';
        $mail->Password = EMAIL_PASS . $data['email_pass'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom($data['nick'] . '@nebulasend.com', $data['recipient_name']);
        $mail->addAddress($to, $to);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        $mail->send();
    }

    private static function sendProduction(string $to, string $subject, string $message, array $data): void {
        if(DEV_MODE) return;

        if(!mail($to, $subject, $message, "From: ".$data['recipient_name']." <".$data['nick']."@nebulasend.com>\r\n")) {
            throw new Exception("Something went wrong while sending email.");
        }
    }

    private static function createEmail(string $to, string $subject, string $message, array $data): void {
        $emails = new M\EmailsMessages;

        $emails->create([
            'user_id' => $data['id'],
            'sent_by' => $data['nick'] . '@nebulasend.com',
            'sent_to' => $to,
            'subject' => $subject,
            'recipient' => $data['nick'],
            'message' => $message,
            'sent_at' => time()
        ]);
    }

    private static function success() {
        return json_encode(
            (object) array(
                'stat' => true,
                'text' => 'Email was sent successfully.'
            )
        );
    }
}

?>