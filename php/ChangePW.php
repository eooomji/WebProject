<?php
    require_once("dbconfig.php");    // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    
    // 패스워드 변경
    $sql = "UPDATE `user` SET `password` = '$password' WHERE `username` = '$username'";
    $db->query($sql);
    echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);

    mysqli_close($db);
?>