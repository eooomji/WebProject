<?php
require_once("dbconfig.php"); 

session_start();
$UserName = $_SESSION["sess_username"];
session_write_close();

$sql = "SELECT `UserName`,`score`, `name`, `email`, `choice`, `password` FROM user WHERE `UserName` = '$UserName'";
$res = $db->query($sql);

$row = $res->fetch_array(MYSQLI_ASSOC);

if($row['password'] == 'KAKAOLOGIN') {
    $row['IsOAuth'] = true;
}


if ($row) {
    $row['UserNickName'] = $row['name'];
    $row['UserEmail'] = $row['email'];
    $row['Settingexercise'] = ($row['choice'] & 1) == 1;
    $row['Settingvolunteer'] = ($row['choice'] & 2) == 2;
    $row['Settinghabit'] = ($row['choice'] & 4) == 4;
    $row['Settingmanner'] = ($row['choice'] & 8) == 8;
    unset($row['name']);
    unset($row['password']);
    unset($row['email']);
    unset($row['choice']);
    echo json_encode($row,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
} else {
    http_response_code(400);
}

mysqli_close($db);

?>