<?php

namespace Controllers\Auth;

use Models as M;
use Exception;

class GetMessages
{
    public static function init()
    {
        try {
            validateAuth();

            $emailsMessages = new M\EmailsMessages;

            $data = getUserData('id, nick, email_pass');
            $smtpMessages = self::getSmtpMessages($data);

            self::createEmailMessages($smtpMessages, $emailsMessages);

            $messages = self::messages($emailsMessages, $data);

            echo self::success($messages);
        } catch (Exception $e) {
            echo json_encode(['stat' => false, 'text' => $e->getMessage()]);
        }
    }

    private static function getSmtpMessages(array $data): array
    {
        $username = $data['nick'] . '@nebulasend.com';
        $password = EMAIL_PASS . $data['email_pass'];
        $hostname = '{mail.nebulasend.com:993/imap/ssl}INBOX';

        try {
        $inbox = imap_open($hostname, $username, $password);

        $emails = imap_search($inbox, 'UNSEEN');

        return self::handleSmtpMessages($emails, $inbox, $data['id']);
        } catch (\Error $e) {
            http_response_code(500);
            return [];
        }
    }

    private static function handleSmtpMessages(mixed $emails, object $inbox, string $id): array
    {
        if (!$emails) {
            return [];
        }

        $emailsList = [];

        foreach ($emails as $email_number) {
            $overview = imap_fetch_overview($inbox, $email_number, 0);
            $message = imap_fetchbody($inbox, $email_number, 2);

            if (empty($message)) {
                $message = imap_fetchbody($inbox, $email_number, 1);
            }

            list($recipient, $email, $to) = self::handleSmtpMessage($overview);
            list($message, $summary) = self::handleSmtpMessageContent($message);

            array_push($emailsList, [
                'user_id' => $id,
                'sent_by' => $email,
                'sent_to' => $to,
                'subject' => mb_decode_mimeheader($overview[0]->subject),
                'recipient' => $recipient,
                'message' => $message,
                'summary' => $summary,
                'important' => $overview[0]->flagged,
                'sent_at' => strtotime($overview[0]->date)
            ]);
        }

        imap_close($inbox);

        return $emailsList;
    }

    private static function handleSmtpMessage(array $overview): array
    {
        $from = $overview[0]->from;

        $recipient = rtrim(strchr($from, "<", true));
        $email = trim(strchr($from, "<"), "<>");

        $to = $overview[0]->to;

        if (str_contains($to, '@nebulasend.com') and str_starts_with($to, '"')) {
            $matches = [];
            preg_match('/<(.+?)>/', $to, $matches);
            $to = $matches[1];
        }

        return [$recipient, $email, $to];
    }

    private static function handleSmtpMessageContent(string $message): array
    {
        $message = str_replace('3D\\"', '', $message);
        $message = quoted_printable_decode($message);
        $message = htmlspecialchars_decode($message);
        $message = stripslashes($message);

        $pattern = '/<a((?:(?!target="_blank").)*?)>/i';
        $replacement = '<a$1 target="_blank">';
        $message = preg_replace($pattern, $replacement, $message);

        $summary = new \Html2Text\Html2Text($message);
        $summary = $summary->getText();
        $summary = trim(strlen($summary) > 150 ? substr($summary, 0, 150) : $summary);

        return [$message, $summary];
    }

    private static function createEmailMessages(array $messages, object $emailMessages): void
    {
        if (!count($messages)) {
            return;
        }

        foreach ($messages as $message) {
            $emailMessages->create($message);
        }
    }

    private static function messages(object $emailsMessages, array $data): array
    {
        $a = isset($_GET['a']) ? $_GET['a'] : 'inbox';

        $arr = [
            ':email' => $data['nick'] . '@nebulasend.com',
            ':userId' => $data['id']
        ];

        switch ($a) {
            case 'important':
                $messages = $emailsMessages->important($arr);
                break;
            case 'starred':
                $messages = $emailsMessages->starred($arr);
                break;
            case 'sent':
                $messages = $emailsMessages->sent($arr);
                break;
            case 'all':
                $messages = $emailsMessages->all($arr);
                break;
            case 'trash':
                $messages = $emailsMessages->trash($arr);
                break;
            default:
                $messages = $emailsMessages->inbox($arr);
                break;
        }

        return $messages;
    }

    private static function success(array $messages): string
    {
        return json_encode([
            'stat' => true,
            'emailsMessages' => $messages
        ]);
    }
}

?>