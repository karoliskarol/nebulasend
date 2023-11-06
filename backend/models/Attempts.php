<?php

namespace Models;

class Attempts extends Sql
{
    protected $table = 'attempts';

    public function create($type): void
    {
        $this->insert([
            'ip' => $_SERVER['REMOTE_ADDR'],
            'type' => $type,
            'created_at' => time()
        ]);
    }

    public function attempts(string $type, int $miliseconds): int
    {
        return $this->count("ip=:ip AND type=:type AND created_at + $miliseconds > :time", [
            ':ip' => $_SERVER['REMOTE_ADDR'],
            'type' => $type,
            ':time' => time()
        ]);
    }
}

?>