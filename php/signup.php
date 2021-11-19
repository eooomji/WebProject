<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    // PHP 단방향 해쉬 - BCRYPT 방식은 PHP에서 제공하는 가장 강력한 암호화 방식
    // SHA, MD5는 빠른 처리속도로 인하여 GPU 공격에 취약
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $nickname = $_POST["nickname"];
    $missionTime = $_POST["missionTime"];
    $choice = $_POST["choice"];

    $sqi = "INSERT INTO `user` (`username`, `password`, `nickname`, `tel`, `choice`)
            VALUES ('$username', '$password', '$nickname', '$missionTime', '$choice')";
    $db->query($sqi);
    echo true;

    mysqli_close($db);
?>