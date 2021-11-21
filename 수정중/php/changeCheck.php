<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $msdate = $_POST["msdate"];
    $nowMonth = $_POST["nowMonth"];

    $sql = "UPDATE missions SET isDone=1 WHERE msDate = '${msdate}' AND msMonth = '${nowMonth}'";

    $db->query($sql);
    echo true;

    mysqli_close($db);
?>
