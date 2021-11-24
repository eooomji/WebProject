<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    
    $sqi = "UPDATE `user` SET `password` = '$password' WHERE `username` = '$username'";
    $db->query($sqi);
    echo true;

    mysqli_close($db);
?>