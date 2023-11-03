<?php

namespace Models;

class EmailsMessages extends Sql
{
    protected $table = 'emails_messages';
    protected $incrementUlid = true;
    protected $selector = '* , "" as message';

    public function create(array $arr): void
    {
        $this->insert($arr);
    }

    public function fetchById($id) {
        return $this->fetch('*', 'id=:id', [':id' => $id]);
    }

    public function deleteMessage($id) {
        $this->delete('id=:id', [':id' => $id]);
    }

    public function inbox(array $arr)
    {
        return $this->fetchAll($this->selector, 'sent_to=:email AND user_id=:userId AND trash=0 ORDER BY id DESC ', $arr);
    }

    public function important(array $arr)
    {
        return $this->fetchAll($this->selector, '(sent_by=:email OR sent_to=:email) AND user_id=:userId AND important=1 AND trash=0 ORDER BY id DESC ', $arr);
    }

    public function starred($arr)
    {
        return $this->fetchAll($this->selector, '(sent_by=:email OR sent_to=:email) AND user_id=:userId AND starred=1 AND trash=0 ORDER BY id DESC ', $arr);
    }

    public function sent(array $arr)
    {
        return $this->fetchAll($this->selector, 'sent_by=:email AND user_id=:userId AND trash=0 ORDER BY id DESC ', $arr);
    }

    public function all(array $arr)
    {
        return $this->fetchAll($this->selector, '(sent_by=:email OR sent_to=:email) AND user_id=:userId AND trash=0 ORDER BY id DESC ', $arr);
    }

    public function trash(array $arr)
    {
        return $this->fetchAll($this->selector, '(sent_by=:email OR sent_to=:email) AND user_id=:userId AND trash=1 ORDER BY id DESC ', $arr);
    }

    public function changeStatus(string $set, string $id): void {
        $this->query("UPDATE $this->table SET $set WHERE id=:id", [':id' => $id]);
    }

    public function fetchUserId(string $id): mixed {
        return $this->fetchColumn('user_id', 'id=:id', [':id' => $id]);
    }

    public function countSent() {
        return $this->count("sent_by LIKE '%@nebulasend.com'", []);
    }

    public function countReceived() {
        return $this->count("sent_to LIKE '%@nebulasend.com'", []);
    }
}

?>