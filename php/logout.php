<?php
    // 에러 처리
    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    // json통신
    header("Content-Type:application/json");
    
    session_start(); // 세션 시작
    session_unset(); // 세션 삭제
    session_write_close();  // 세션 종료
    echo JSON_ENCODE(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
?>