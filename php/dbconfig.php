<?php
// 에러 처리
error_reporting(E_ALL);
ini_set("display_errors", 1);

// json통신
header("Content-Type:application/json");

$host = "localhost";
$user = "root";
$pw = "password";
$dbName = "goodPerson";

$db = new mysqli($host, $user, $pw, $dbName);

mysqli_set_charset($db, "utf8");
?>