<?php

namespace Models;

class Users extends Sql
{
    protected $table = 'users';
    protected $incrementUlid = true;

    public function create(string $nick, string $hashedPass, string $emailPassRandom): object
    {
        return $this->insert([
            'nick' => $nick,
            'pass' => $hashedPass,
            'recipient_name' => $nick,
            'email_pass' => $emailPassRandom
        ]);
    }

    public function exists(string $nick): bool
    {
        return $this->count('nick=:nick', [':nick' => $nick]) > 0;
    }

    public function countAll(): int
    {
        return $this->count('id', []);
    }

    public function fetchColumnByNick(string $column, string $nick): mixed {
        return $this->fetchColumn($column, 'nick=:nick', [':nick' => $nick]);
    }

    public function updatePassword(string $id, string $hashedPass) {
        return $this->update('id=:id', [':pass' => $hashedPass], [':id' => $id]);
    }

    public function updateRecipient(string $id, string $name) {
        return $this->update('id=:id', [':recipient_name' => $name], [':id' => $id]);
    }
}

?>