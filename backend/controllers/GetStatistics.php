<?php

namespace Controllers;

use Models as M;

class GetStatistics
{
    public static function init()
    {
        $users = new M\Users;
        $emailsMessages = new M\EmailsMessages;

        return json_encode([
            'users' => $users->countAll(),
            'sent' => $emailsMessages->countSent(),
            'received' => $emailsMessages->countReceived()
        ]);
    }
}

?>