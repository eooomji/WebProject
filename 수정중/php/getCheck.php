<?php
    require_once("dbconfig.php");   // db 초기설정

    $sql = "SELECT isDone FROM missions";

    $data = array();

    $res = $db->query($sql);

    for($i = 0; $i < $res->num_rows; $i++) {
        $row = $res->fetch_array(MYSQLI_ASSOC);    
        array_push($data, $row);
    }

    if ($data != null) {
        echo JSON_ENCODE($data, JSON_UNESCAPED_UNICODE);
    }
    else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE);
    }

    mysqli_close($db);
?>
