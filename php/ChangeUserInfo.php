<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$name= $_POST["name"];
$password = password_hash($_POST["password"], PASSWORD_BCRYPT);
$username = $_POST["username"]; 
$email = $_POST["email"];

session_start();
$Name_on_Session = $_SESSION["sess_username"];


$sql = "UPDATE `test`.`user` SET `username` = '$username', `password` = '$password', `name` = '$name', `email` = '$email' WHERE `username` = '$Name_on_Session'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	if($_SESSION["sess_username"] != $username) {
		$_SESSION["sess_username"] = $username;
	}
	$result = array("Result"=>"Success", "Message"=>"Success");
} else {
	$result = array("Result"=>"Failure", "Message"=>"FailReason");
}

echo JSON_ENCODE($result);


session_write_close();
mysqli_close($db);

?>