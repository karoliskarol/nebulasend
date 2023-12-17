<?php

namespace Models;

use PDO;
use PDOException;
use Ulid\Ulid;

class Sql
{

    protected static $conn;
    protected $table;
    protected $incrementUlid;
    
    public function __construct() {
        if(self::$conn) return;

        try {
            self::$conn = new PDO("mysql:host=".SERVER_NAME.";dbname=". DB, USERNAME, PASSWORD);
            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$conn->exec("set names utf8mb4");
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    // ONLY USE THOSE BELOW IN YOUR MODELS 

    public function fetchColumn(string $select, string $where, array $array): mixed
    {
        $stmt = self::$conn->prepare("SELECT $select FROM $this->table " . self::handleWhere($where));
        $stmt->execute($array);
        return $stmt->fetchColumn();
    }

    public function fetch(string $select, string $where, array $array): mixed
    {
        $stmt = self::$conn->prepare("SELECT $select FROM $this->table " . self::handleWhere($where));
        $stmt->execute($array);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function fetchAll(string $select, string $where, array $array): mixed
    {
        $stmt = self::$conn->prepare("SELECT $select FROM $this->table " . self::handleWhere($where));
        $stmt->execute($array);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function count(string $where, array $array): int
    {
        $stmt = self::$conn->prepare("SELECT id FROM $this->table " . self::handleWhere($where));
        $stmt->execute($array);
        return $stmt->rowCount();
    }

    public function query(string $query, array $array): void
    {
        $stmt = self::$conn->prepare($query);
        $stmt->execute($array);
    }

    public function update(string $where, array $setArray, array $whArray): void
    {
        $stmt = self::$conn->prepare("UPDATE $this->table SET " . self::arrayToSet($setArray) . " " . self::handleWhere($where));
        $stmt->execute(array_merge($setArray, $whArray));
    }

    public function insert(array $array): object
    {
        $ulid = Ulid::generate();

        $stmt = self::$conn->prepare("INSERT INTO $this->table (". ($this->incrementUlid ? 'id, ' : ''). self::arraytoColumns($array) . ") VALUES (". ($this->incrementUlid ? "'{$ulid}'," : '') . self::arrayToValues($array) . ")");
        $stmt->execute($array);

        $array['ulid'] = $ulid;
        
        return (object) $array;
    }

    public function delete(string $where, array $array): void
    {
        $stmt = self::$conn->prepare("DELETE FROM $this->table " . self::handleWhere($where));
        $stmt->execute($array);
    }

    // ONLY USE THOSE BELOW IN YOUR CONTROLLERS

    public function fetchColumnByColumn(string $col, string $wcol, string $val): mixed {
        return $this->fetchColumn($col, $wcol . '=:' . $wcol , [':'.$wcol => $val]);
    }

    public function fetchColumnsById(string $columns, string $id): mixed {
        return $this->fetch($columns, 'id=:id', [':id' => $id]);
    }

    public function fetchColumnById(string $column, string $id): mixed {
        return $this->fetchColumn($column, 'id=:id', [':id' => $id]);
    }

    // IT'S PRIVATE BECAUSE IT'S MENT TO BE USED IN ONLY IN THIS CLASS

    private static function handleWhere(string $where): string
    {
        return empty($where) ? '' : "WHERE $where";
    }

    private static function arraytoColumns(array $array): string
    {
        return implode(',', array_keys($array));
    }

    private static function arraytoValues(array $array): string
    {
        return ':' . implode(',:', array_keys($array));
    }

    private static function arrayToSet(array $array): string
    {
        return implode(',', array_map(function ($key) {
            return substr($key, 1) . '=' . $key;
        }, array_keys($array)));
    }
}

?>