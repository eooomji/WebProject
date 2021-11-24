<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);
session_start();

$name= $_POST["name"];
$username = $_POST["username"]; 
$email = $_POST["email"];
$Name_on_Session = $_SESSION["sess_username"];

if(empty($_POST["password"])) {
	$sql = "UPDATE `user` SET `username` = '$username', `name` = '$name', `email` = '$email' WHERE `username` = '$Name_on_Session'";
} else {
	$password = password_hash($_POST["password"], PASSWORD_BCRYPT);
	$sql = "UPDATE `user` SET `username` = '$username', `password` = '$password', `name` = '$name', `email` = '$email' WHERE `username` = '$Name_on_Session'";
}

$res = $db->query($sql); 

$success = $res;

if($success) {
	if($_SESSION["sess_username"] != $username) {
		$_SESSION["sess_username"] = $username;
	}
	$result = array("Result"=>"Success", "Message"=>"수정 완료");
} else {
	$result = array("Result"=>"Failure", "Message"=>"수정 실패");
}

echo JSON_ENCODE($result, JSON_UNESCAPED_UNICODE);

session_write_close();
mysqli_close($db);

?>
