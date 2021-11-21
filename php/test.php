<?php
require_once("dbconfig.php"); 

$_POST = JSON_DECODE(file_get_contents("php://input"), true);
$UserName = $_POST["UserName"];
$password = password_hash($_POST["password"], PASSWORD_BCRYPT);

$sql = "UPDATE `test`.`user` SET `password` = '$password' WHERE `UserName` = '$UserName'";
$res = $db->query($sql); 

echo JSON_ENCODE($res);

mysqli_close($db);

?>