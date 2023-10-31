<?php

namespace Models;

class EmailsMessages extends Sql
{
    protected $table = 'emails_messages';
    protected $incrementUlid = true;

    public function create($arr): void
    {
        $this->insert($arr);
    }

    public function fetchById($id) {
        return $this->fetch('*', 'id=:id', [':id' => $id]);
    }

    public function inbox($arr)
    {
        return $this->fetchAll('*', 'sent_to=:email AND user_id=:userId ORDER BY id DESC ', $arr);
    }

    public function important($arr)
    {
        return $this->fetchAll('*', '(sent_by=:email OR sent_to=:email) AND user_id=:userId AND important=1 ORDER BY id DESC ', $arr);
    }

    public function starred($email)
    {
        return $this->fetchAll('*', 'sent_to=:sent_to AND starred=1 ORDER BY id DESC ', [':sent_to' => $email]);
    }

    public function sent($arr)
    {
        return $this->fetchAll('*', 'sent_by=:email AND user_id=:userId ORDER BY id DESC ', $arr);
    }

    public function all($arr)
    {
        return $this->fetchAll('*', '(sent_by=:email OR sent_to=:email) AND user_id=:userId ORDER BY id DESC ', $arr);
    }

    public function trash($arr)
    {
        return $this->fetchAll('*', '(sent_by=:email OR sent_to=:email) AND user_id=:userId AND trash=1 ORDER BY id DESC ', $arr);
    }
}

?>