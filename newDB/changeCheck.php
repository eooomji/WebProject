<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $nowMonth = $_POST["nowMonth"];
    $nowDay = $_POST["nowDay"];
    $userName = $_POST["userName"];
    
    // $sql = "UPDATE misson_log SET check=1 WHERE msDate = '${msdate}' AND msMonth = '${nowMonth}'";
    $sql = "UPDATE misson_log SET check=1 WHERE username='${userName}' AND MONTH(date) = '${nowMonth}' AND DAY(date)='${nowDay}'";
    
    // echo $DAY(date);
    $db->query($sql);
    echo true;

    mysqli_close($db);
?>
