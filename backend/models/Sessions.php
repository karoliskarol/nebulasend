<?php

namespace Models;

class Sessions extends Sql
{
    protected $table = 'sessions';

    public function create(string $session, string $uid): void
    {
        $this->insert([
            'id' => sha1($session),
            'user_id' => $uid
        ]);
    }

    public function exists(): bool
    {
        return $this->count('id=:session', [
            ':session' => isset($_COOKIE['session_token']) ? sha1($_COOKIE['session_token']) : ''
        ]) > 0;
    }

    public function deleteSpecific(): void {
        $this->delete('id=:id', [':id' => sha1($_COOKIE['session_token'])]);
    }

    public function deleteAllOfUser($userId): void {
        $this->delete('user_id=:userId', [':userId' => $userId]);
    }

    public function getUserId(): string {
        return $this->fetchColumn('user_id', 'id=:id', [':id' => sha1($_COOKIE['session_token'])]);
    }
}

?>