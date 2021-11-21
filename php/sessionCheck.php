<?php
    //세션변수 사용
    session_start();

    // 에러 끄기
    // 에러를 끄지 않으면 SESSION 변수가 없을 때 null값 대신 에러값 리턴
    error_reporting(0);
    ini_set("display_errors", 0);

    // json통신
    header("Content-Type:application/json");

    if ($_SESSION["sess_username"]) {
        echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    } else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    }

    session_write_close();
?>