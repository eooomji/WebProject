<?php
    require_once("dbconfig.php");

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT `password` FROM `user` WHERE `username` = '$username'";
    $res = $db->query($sql);
    $row = $res->fetch_array(MYSQLI_ASSOC);

    if($row) {
        $passwordResult = password_verify($password, $row["password"]);
        if ($passwordResult) {
            // 세션 저장
            session_start();
            $_SESSION["sess_username"] = $username;
            session_write_close();

            // 로그인 찍기
            $date = date("Y-m-d H:i:s", time());
            $sql = "INSERT INTO `login_log` (`username`, `loginLog`, `inout`) VALUE ('$username', '$date', 1)";
            $res = $db->query($sql);

            echo JSON_ENCODE(true,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
        } else {
            echo JSON_ENCODE(false,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
        }
    }

    mysqli_close($db);
?>