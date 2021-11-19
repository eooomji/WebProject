<?php
    require_once("dbconfig.php");
    
    $_POST = JSON_DECODE(file_get_contents("php://input"), true);
    $username = $_POST["username"];

    $sql = "SELECT * FROM user WHERE username = '$username'";
    $res = $db->query($sql);
    $row = $res->fetch_array(MYSQLI_ASSOC);

    if($row === null) {
        echo false;
    } else {
        echo true;
    }

    mysqli_close($db);
?>