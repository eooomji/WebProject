<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$UserName = $_POST["UserName"];
$userage = $_POST["UserAge"];

session_start();
$Name = $_SESSION["sess_username"];

$sql = "UPDATE `user` SET `UserName` = '$UserName', `UserAge` = $userage WHERE `UserName` = '$Name'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	$_SESSION["sess_username"] = $UserName;
	echo '{"Result":"Success", "Message":"Success"}';
} else {
	echo '{"Result":"Failure", "Message":"FailReason"}';
}

session_write_close();

mysqli_close($db);

?>