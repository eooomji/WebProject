<?php
// 에러 켜기
error_reporting(E_ALL);
ini_set("display_errors", 1);

// 통신할 때 언어 타입 지정
header("Content-Type:application/json");

// DB 초기설정
$host = '127.0.0.1'; // localhost X. 참고 -> https://stackoverflow.com/questions/13439817/why-is-my-mysqli-connection-so-slow
$user = 'root';
$pw = 'password';
$dbName = 'goodPerson';
$db = new mysqli($host, $user, $pw, $dbName);

mysqli_set_charset($db, "utf8");
?>
