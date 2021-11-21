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

//const google_login = () => {
    const google_login = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log("id: " + profile.getId());
        console.log("Full Name: " + profile.getName());
        console.log("Email: " + profile.getEmail());

        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }

const naver_id_login = () => {
    const naverLogin = new naver.LoginWithNaverId({
        clientId : "lu6p3IJh8_cSRKZpHEkS",
        callbackUrl : "http://localhost/html/OauthRedirect.html",
        isPopup : true,
        callbackHandle : true,
        loginButton : {color : "green", type : 3, height : 60}
    });
    
    naverLogin.init();
    
    document.querySelector("#naverIdLogin_loginButton").click();
}



const kakao_login = () => {
    Kakao.init("36fe7aa2beef85ae40b6a5601f75dc43");
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
        name : name
    }

    try {
        const response = await axios.post("../php/kakaoLogin.php", {
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

const getURL = (domain, param) => {
    let url = `${domain}?`;
    for(let key in param) {
        url += `${key}=${param[key]}&`;
    }
    return url;
}

/* oauth 2.0 spec의 state 값 자동 생성 */
const getState = () => {
    const state = stat_str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8); return v.toString(16); });
    return state;
}

/* axios CORS 에러로 인해 html form 방식 활용 */
const sendPost = (action, param) => {
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);
    for (let key in param) {
        let hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', param[key]);
        form.appendChild(hiddenField);
	}
	document.body.appendChild(form);
	form.submit();
}