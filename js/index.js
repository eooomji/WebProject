// 4초뒤 로그인 페이지로 이동
window.onload = function() { 
    setTimeout(() => { 
        location.replace("../html/Login.html");
    }, 4000);
}
