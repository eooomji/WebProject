<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

header("Content-Type:application/json");

$host = '127.0.0.1';
$user = 'root';
// pw와 dbName 각자의 디비에 맞게 수정바람
$pw = 'password';
$dbName = 'goodPerson';
$db = new mysqli($host, $user, $pw, $dbName);

mysqli_set_charset($db, "utf8");
?>