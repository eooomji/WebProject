<?php
    //���Ǻ��� ���
    session_start();

    // ���� ����
    // ������ ���� ������ SESSION ������ ���� �� null�� ��� ������ ����
    error_reporting(0);
    ini_set("display_errors", 0);

    // json���
    header("Content-Type:application/json");

    if ($_SESSION["sess_username"]) {
        echo JSON_ENCODE($_SESSION["sess_username"], JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    } else {
        echo JSON_ENCODE(false, JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    }

    session_write_close();
