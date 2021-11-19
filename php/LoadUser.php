<?php
require_once("dbconfig.php"); 

session_start();
$username = $_SESSION["sess_username"];
session_write_close();

$sql = "SELECT `UserName`,`UserAge`,`score` FROM user WHERE `UserName` = '$username'";
$res = $db->query($sql); 

$row = $res->fetch_array(MYSQLI_ASSOC); 
if ($row) {
    echo json_encode($row,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
}

mysqli_close($db);

?>