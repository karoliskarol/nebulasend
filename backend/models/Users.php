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
            'email_pass' => $emailPassRandom
        ]);
    }

    public function exists(string $nick): bool
    {
        return $this->count('nick=:nick', [':nick' => $nick]) > 0;
    }

    public function fetchColumnByNick(string $column, string $nick): mixed {
        return $this->fetchColumn($column, 'nick=:nick', [':nick' => $nick]);
    }

    public function fetchColumnsById(string $column, string $id): mixed {
        return $this->fetch($column, 'id=:id', [':id' => $id]);
    }

    public function updatePassword($id, $hashedPass) {
        return $this->update('id=:id', [':pass' => $hashedPass], [':id' => $id]);
    }
}

?>