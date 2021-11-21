<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$UserName = $_POST["UserName"];
$password = password_hash($_POST["UserPassword"], PASSWORD_BCRYPT);
$UserNickName = $_POST["UserNickName"]; 
$UserEmail = $_POST["UserEmail"];

session_start();
$Name_on_Session = $_SESSION["sess_username"];


$sql = "UPDATE `test`.`user` SET `UserName` = '$UserName', `password` = '$password', `name` = '$UserNickName', `email` = '$UserEmail' WHERE `UserName` = '$Name_on_Session'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	if($_SESSION["sess_username"] != $UserName) {
		$_SESSION["sess_username"] = $UserName;
	}
	$result = array("Result"=>"Success", "Message"=>"Success");
} else {
	$result = array("Result"=>"Failure", "Message"=>"FailReason");
}

echo JSON_ENCODE($result);


session_write_close();
mysqli_close($db);

?>