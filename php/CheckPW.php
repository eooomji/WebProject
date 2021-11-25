<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $username = $_POST["username"];
    $name = $_POST["name"];
    $email = $_POST["email"];

    // 유저 정보 판별
    $sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `name` = '$name' AND `email` = '$email'";
    $res = $db->query($sql);
    $row = $res->fetch_array(MYSQLI_ASSOC);

    if($row) {
        // 유저의 패스워드가 Oauth일 경우 Oauth 유저임을 알림
        $sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = 'Oauth'";
        $res = $db->query($sql);
        $row = $res->fetch_array(MYSQLI_ASSOC);
        if($row)
            echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
        else {
            echo JSON_ENCODE("oauth", JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
        }
    } else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }

    mysqli_close($db);
?>