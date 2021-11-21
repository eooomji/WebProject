/* 세션체크 */
// onload : html문서에 들어왔을 때 연결된 js에 onload가 있을 경우 구문 자동실행
// overriding
onload = async() => {
    try {
        const response = await axios.get("../php/sessionCheck.php");
        if(response.data) { // 세션에 로그인정보가 있을 경우
            location.replace("../html/main.html");
        } else {  // 세션에 로그인정보가 없을 경우
            ;
        }
    } catch(error) {
      console.log(error);
    }
};

const login = async() => {
    const username = document.querySelector("#idInput").value;
    const password = document.querySelector("#pwInput").value;
    
    try {
        const response = await axios.post("../php/login.php", {
            UserName : username,
            password : password
        });

        if(response.data) {
            alert("로그인 성공 !!");
            location.replace("../html/main.html");
        } else {
            alert("로그인 실패 !!");
        }
    } catch (error) {
        console.log(error);
    }
}

const kakaologin = async() => {
    Kakao.Auth.login({
        scope : "profile_nickname, account_email",
        success : function() {
            Kakao.API.request({
                url : "/v2/user/me",
                success : res => {
                    const kakao_account = res.kakao_account;
                    const username = kakao_account["email"];
                    const nickname = kakao_account.profile["nickname"];
                    judge_data(username, nickname);
                    Kakao.Auth.logout();
                }
            });
        }
    });
}

const judge_data = async(username, nickname) => {
    const info = {
        username : username,
        nickname : nickname
    }

    try {
        const response = await axios.post("../php/kakaoLogin.php", {
            username : username
        })
        if(response.data) { // 기존 사용자일 경우
            location.replace("../html/main.html");
        } else {    // 처음 사용자일 경우
            localStorage.setItem("info", JSON.stringify(info));
            location.replace("../html/kakaoSignup.html");
        }
    } catch(error) {
        console.log(error);
    }
}