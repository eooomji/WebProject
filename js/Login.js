let flag = 0;
/* 세션체크 */
// onload : html문서에 들어왔을 때 연결된 js에 onload가 있을 경우 구문 자동실행
// overriding
onload = async() => {
    try {
        const response = await axios.get("../php/sessionCheck.php");
        if(response.data) { 
            // 세션에 로그인정보가 있을 경우
            location.replace("../html/Main.html");
        } else {  
            ;// 세션에 로그인정보가 없을 경우
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
            username : username,
            password : password
        });

        if(response.data) {
            alert("로그인 성공 !!");
            location.replace("../html/Main.html");
        } else {
            alert("로그인 실패 !!");
        }
    } catch (error) {
        console.log(error);
    }
}

const google_login = () => {
    document.querySelector(".abcRioButtonContentWrapper").click();
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const username = profile.getEmail();
    const name = profile.getName();
    judge_data(username, name);
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
}


const naver_login = () => {
    const naverLogin = new naver.LoginWithNaverId({
        clientId : "lu6p3IJh8_cSRKZpHEkS",
        callbackUrl : "http://localhost/html/OauthRedirect.html",
        isPopup : true,
        callbackHandle : true,
        loginButton : {color : "green", type : 3, height : 60}
    });
    
    naverLogin.init();
    
    document.querySelector("#naverIdLogin_loginButton").click()
}



const kakao_login = () => {
    if(flag === 0) {
        Kakao.init("36fe7aa2beef85ae40b6a5601f75dc43");
        flag = 1;
    }

    Kakao.Auth.login({
        scope : "profile_nickname, account_email",
        success : function() {
            Kakao.API.request({
                url : "/v2/user/me",
                success : res => {
                    const kakao_account = res.kakao_account;
                    const username = kakao_account["email"];
                    const name = kakao_account.profile["nickname"];
                    judge_data(username, name);
                    Kakao.Auth.logout();
                }
            });
        }
    });
}

const judge_data = async(username, name) => {
    const info = {
        username : username,
        name : name,
        email : username
    }

    try {
        const response = await axios.post("../php/LoginForOauth.php", {
            username : username
        })
        if(response.data) {
            // 기존 사용자일 경우
            location.replace("../html/Main.html");
        } else {
            // 처음 사용자일 경우
            sessionStorage.setItem("info", JSON.stringify(info));
            location.replace("../html/JoinForOauth.html");
        }
    } catch(error) {
        console.log(error);
    }
}