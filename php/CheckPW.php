<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    $name = $_POST["name"];
    $email = $_POST["email"];

    $sqi = "SELECT * FROM `user` WHERE `username` = '$username' AND `name` = '$name' AND `email` = '$email'";
    $res = $db->query($sqi);
    $row = $res->fetch_array(MYSQLI_ASSOC);

    if($row) {
        echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    } else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }

    mysqli_close($db);
?>