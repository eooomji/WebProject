<?php
    require_once("dbconfig.php");   // db 초기설정

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $userName = $_POST["userName"];
    
    $sql = "UPDATE user SET score=score+1 WHERE username='${userName}'";

    $db->query($sql);
    
    echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);

    mysqli_close($db);
?>
