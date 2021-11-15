<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    // PHP 단방향 해쉬 - BCRYPT 방식은 PHP에서 제공하는 가장 강력한 암호화 방식
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $nickname = $_POST["nickname"];
    $tel = $_POST["tel"];
    $choice = $_POST["choice"];

    $sqi = "INSERT INTO `user` (`username`, `password`, `nickname`, `tel`, `choice`)
            VALUES ('$username', '$password', '$nickname', '$tel', '$choice')";
    $db->query($sqi);
    echo true;

    mysqli_close($db);
?>