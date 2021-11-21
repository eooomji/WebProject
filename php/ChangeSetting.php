<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$choice = 0;
if($_POST["Settingexercise"] == "true") {
	$choice += 1;
}
if($_POST["Settingvolunteer"] == "true") {
	$choice += 2;
}
if($_POST["Settinghabit"] == "true") {
	$choice += 4;
}
if($_POST["Settingmanner"] == "true") {
	$choice += 8;
}

session_start();
$Name_on_Session = $_SESSION["sess_username"];

$sql = "UPDATE `test`.`user` SET `choice` = $choice WHERE `UserName` = '$Name_on_Session'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	$result = array("Result"=>"Success", "Message"=>"Success");
} else {
	$result = array("Result"=>"Failure", "Message"=>"FailReason");
}

echo JSON_ENCODE($result);


session_write_close();
mysqli_close($db);

?>