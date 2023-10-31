<?php

namespace Models;

class LoginAttempts extends Sql
{
    protected $table = 'login_attempts';

    public function create(): void
    {
        $this->insert([
            'ip' => $_SERVER['REMOTE_ADDR'],
            'created_at' => time()
        ]);
    }

    public function attempts()
    {
        return $this->count('ip=:ip AND created_at + 300 > :time', [
            ':ip' => $_SERVER['REMOTE_ADDR'],
            ':time' => time()
        ]);
    }
}

?>