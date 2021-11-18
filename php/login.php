<?php
require_once("dbconfig.php");

$_POST = JSON_DECODE(file_get_contents("php://input"), true);
$UserName = $_POST["UserName"];
$password = $_POST["password"];

$sql = "SELECT `password` FROM `user` WHERE `UserName` = '$UserName'";
$res = $db->query($sql);
$row = $res->fetch_array(MYSQLI_ASSOC);

if($row) {
    $passwordResult = password_verify($password, $row["password"]);
    if ($passwordResult) {
        session_start();
        $_SESSION["sess_username"] = $UserName;
        session_write_close();
        echo JSON_ENCODE(true,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    } else {
        echo JSON_ENCODE(false,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    }
}

mysqli_close($db);