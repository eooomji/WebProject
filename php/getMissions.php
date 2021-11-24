<?php

    require_once('dbconfig.php');

    $_POST = JSON_DECODE(file_get_contents("php://input"), true);

    $nowMonth = 11;//$_POST["nowMonth"];
    $userName = "username";//$_POST["userName"];
    
    // 현재 월의 마지막 날 구하는 구문
    $time = "21-".$nowMonth."-21";
    $LastDay = date("t", strtotime($time));

    $sql = "SELECT missionName, DAY(date) FROM misson_log WHERE username = '$userName' AND MONTH(date)=$nowMonth";

    $data = array();

    $res = $db->query($sql);

    for($i = 1; $i <= $LastDay; $i++) {
        $data[$i]["missionName"] = "0";
    }
    
    for($i = 0; $i < $res->num_rows; $i++) {
        $row = $res->fetch_array(MYSQLI_ASSOC);    
        $data[$row["DAY(date)"]]["missionName"] = $row["missionName"];
    }

    if ($data != null) {
        echo JSON_ENCODE($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
    else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
   } 

   mysqli_close($db);
?>
