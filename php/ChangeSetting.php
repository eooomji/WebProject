<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$choice = $_POST["choice"];

session_start();
$Name_on_Session = $_SESSION["sess_username"];

$sql = "UPDATE `user` SET `choice` = $choice WHERE `username` = '$Name_on_Session'";
$res = $db->query($sql); 

$success = $res;

if($success) {
	$result = array("Result"=>"Success", "Message"=>"수정 완료");
} else {
	$result = array("Result"=>"Failure", "Message"=>"수정 실패");
}

echo JSON_ENCODE($result, JSON_UNESCAPED_UNICODE);


session_write_close();
mysqli_close($db);

?>