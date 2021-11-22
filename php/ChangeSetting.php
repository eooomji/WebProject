<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$choice = $_POST["choice"];

session_start();
$Name_on_Session = $_SESSION["sess_username"];

$sql = "UPDATE `test`.`user` SET `choice` = $choice WHERE `username` = '$Name_on_Session'";
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