<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    $name = $_POST["nickname"];
    $email = $_POST["tel"];
    $choice = $_POST["choice"];

    $sqi = "INSERT INTO `user` (`username`, `password`, `name`, `email`, `choice`, `score`)
    VALUES ('$username', 'Oauth', '$name', '$email', '$choice', '0')";
    $db->query($sqi);
    echo true;

    mysqli_close($db);
?>