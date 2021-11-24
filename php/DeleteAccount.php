<?php
require_once("dbconfig.php"); 

session_start();

$Name_on_Session = $_SESSION["sess_username"];

$sql = "DELETE FROM `user` WHERE `username` = '$Name_on_Session'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	echo true;
    session_unset();
} else {
	echo false;
}

session_write_close();
mysqli_close($db);

?>