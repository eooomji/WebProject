<?php
require_once("dbconfig.php"); 

session_start();
$username = $_SESSION["sess_username"];
session_write_close();

$sql = "SELECT * FROM (SELECT `username`,`score`, `name`, `email`, `choice`, `password`, rank() over(ORDER BY `score` DESC) AS rank FROM `user`)DATAROW WHERE `username` = '$username'";
$res = $db->query($sql);

$row = $res->fetch_array(MYSQLI_ASSOC);

if ($row) {
    $row['IsOAuth'] = $row['password'] == 'OAuth' ? true : false;
    unset($row['password']);
    echo json_encode($row,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
} else {
    echo json_encode($row,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
}
mysqli_close($db);

?>