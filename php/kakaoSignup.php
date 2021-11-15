<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    $nickname = $_POST["nickname"];
    $tel = $_POST["tel"];
    $choice = $_POST["choice"];

    $sqi = "INSERT INTO `user` (`username`, `password`, `nickname`, `tel`, `choice`)
            VALUES ('$username', 'KAKAOLOGIN', '$nickname', '$tel', '$choice')";
    $db->query($sqi);
    echo true;

    mysqli_close($db);
?>