<?php

require_once('dbconfig.php');
$_POST = JSON_DECODE(file_get_contents("php://input"), true);
$nowMonth = $_POST["nowMonth"];


$sq = "SELECT `content` FROM `missions` WHERE `msMonth` = `$nowMonth`";

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
?>