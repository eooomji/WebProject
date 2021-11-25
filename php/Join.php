<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    // PHP 단방향 해쉬 - BCRYPT 방식은 PHP에서 제공하는 가장 강력한 암호화 방식
    // SHA, MD5는 빠른 처리속도로 인하여 GPU 공격에 취약
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $name = $_POST["name"];
    $email = $_POST["email"];
    $choice = $_POST["choice"];

    // 회원정보 넣기
    $sqi = "INSERT INTO `user` (`username`, `password`, `name`, `email`, `choice`, `score`)
            VALUES ('$username', '$password', '$name', '$email', '$choice', '0')";
    $db->query($sqi);
    echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);

    mysqli_close($db);
?>