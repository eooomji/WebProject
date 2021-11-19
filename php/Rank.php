<?php
require_once("dbconfig.php"); 

$sql = "SELECT `UserName`, `score` FROM user ORDER BY `score` DESC";
$res = $db->query($sql); 

$data = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $row = $res->fetch_array(MYSQLI_ASSOC);
    $row = array($row['UserName'], $row['score']);
    array_push($data, $row);
}
 
$Response = array('StartRank' => 1, 'data' => $data);

if ($Response) {
    echo json_encode($Response,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
}

mysqli_close($db);

?>