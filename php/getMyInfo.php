<?php
    require_once("dbconfig.php");

    session_start();
    $username = $_SESSION["sess_username"];
    session_write_close();
    $sql = "
        SELECT
            `username`,
            `nickname`,
            `tel`,
            `choice` 
        FROM `user` WHERE `username` = '$username'
    ";
    $res = $db->query($sql);
    $row = $res->fetch_array(MYSQLI_ASSOC);

    if($row) {
        echo JSON_ENCODE($row, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    } else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }

    mysqli_close($db);
?>