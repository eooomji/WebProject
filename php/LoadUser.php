<?php
require_once("dbconfig.php"); 

session_start();
$username = $_SESSION["sess_username"];
session_write_close();

$sql = "SELECT `username`,`score`, `name`, `email`, `choice`, `password` FROM user WHERE `username` = '$username'";
$res = $db->query($sql);

$row = $res->fetch_array(MYSQLI_ASSOC);

if ($row) {
    echo json_encode($row,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    if($row['password'] == 'KAKAOLOGIN') {
        $row['IsOAuth'] = true;
    }
    unset($row['password']);
} else {
    http_response_code(400);
}
mysqli_close($db);

?>