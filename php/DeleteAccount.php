<?php
require_once("dbconfig.php"); 

session_start();

$Name_on_Session = $_SESSION["sess_username"];

$sql = "DELETE FROM `user` WHERE `username` = '$Name_on_Session'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    session_unset();
} else {
	echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}

session_write_close();
mysqli_close($db);

?>