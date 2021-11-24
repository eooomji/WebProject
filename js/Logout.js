const logout = async() => {
    try {
        const response = await axios.get("../php/logout.php");
        if(response.data === true) {
            console.log(response.data);
            // 세션에 로그인정보가 있을 경우
            alert("로그아웃 성공");
            location.replace("../html/Login.html");
        } else {  
            alert("예기치 못한 이유로 로그아웃에 실패했습니다.");
        }
    } catch(error) {
        console.log(error);
    }
}