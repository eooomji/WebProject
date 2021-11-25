<?php
    require_once("dbconfig.php");
    
    // 세션 종료
    session_start();
    $username = $_SESSION["sess_username"];
    session_unset();
    session_write_close();

    // 로그아웃 찍기
    $date = date("Y-m-d H:i:s", time());
    $sql = "INSERT INTO `login_log` (`username`, `loginLog`, `inout`) VALUE ('$username', '$date', 0)";
    $res = $db->query($sql);

    echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    mysqli_close($db);
?>