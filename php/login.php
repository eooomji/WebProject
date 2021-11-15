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
            session_start();
            $_SESSION["sess_username"] = $username;
            session_write_close();
            echo JSON_ENCODE(true,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
        } else {
            echo JSON_ENCODE(false,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
        }
    }

    mysqli_close($db);
?>