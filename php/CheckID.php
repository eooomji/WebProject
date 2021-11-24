<?php
    require_once("dbconfig.php");   // db 초기설정

    //오류끄기
    ini_set( 'display_errors', '0' );

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $name = $_POST["name"];
    $email = $_POST["email"];

    $sqi = "SELECT `username` FROM `user` WHERE `name` = '$name' AND `email` = '$email'";
    $res = $db->query($sqi);
    $row = $res->fetch_array(MYSQLI_ASSOC);

    if($row) {
        echo JSON_ENCODE($row, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    } else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }

    mysqli_close($db);
?>