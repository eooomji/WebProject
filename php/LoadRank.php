<?php
require_once("dbconfig.php"); 

$sql = "SELECT `name`, `score` FROM `user` ORDER BY `score` DESC"; // 1위부터 전부 출력. 별도 조건 설정 시 아래의 StartRank 도 변경
$res = $db->query($sql); 

if($res) {
    $data = array();
    for ($i = 0; $i < $res->num_rows; $i++) {
        $row = $res->fetch_array(MYSQLI_ASSOC);
        $row = array($row['name'], $row['score']);
        array_push($data, $row);
    }
 
    $Response = array('StartRank' => 1, 'data' => $data);

    echo json_encode($Response,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
} else {
    echo false;
}

mysqli_close($db);

?>