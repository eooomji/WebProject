<?php
require_once("dbconfig.php");   // db 초기설정

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$username = $_POST["username"];
$password = $_POST["password"];
$nickname = $_POST["nickname"];
$tel = $_POST["tel"];
$choice = $_POST["choice"];

$sql = "SELECT * FROM `user` WHERE name = '$username'";
$res = $db->query($sql);
$row = $res->fetch_array(MYSQLI_ASSOC);
if ($row === null) {
    $sql = "INSERT INTO `user` (`username`, `password`, `nickname`, `tel`, `choice`)
        VALUES ('$username', '$password', '$nickname', '$tel', '$choice')";
    $db->query($sql);
    echo true;
} else {
    echo false;
}
mysqli_close($db);