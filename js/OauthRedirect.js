const naverLogin = new naver.LoginWithNaverId(
    {
            clientId : "lu6p3IJh8_cSRKZpHEkS",
            callbackUrl : "http://localhost/html/OauthRedirect.html",
            isPopup : true,
            callbackHandle : true
    }
);

naverLogin.init();

onload = async() => {
    naverLogin.getLoginStatus(function(status) {
        if(status) {
            const email = naverLogin.user.getEmail();
            const name = naverLogin.user.getName();
        
            if( email === undefined || email === null ) {
                alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                naverLogin.reprompt();
                return;
            }
            
            if( name === undefined || name === null ) {
                alert("이름은 필수정보입니다. 정보제공을 동의해주세요.");
                naverLogin.reprompt();
                return;
            }

            judge_data(email, name);
            naverLogin.logout();

        } else {
            console.log("callback 처리에 실패하였습니다.");
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
        if(response.data === true) {
            // 기존 사용자일 경우
            opener.location.replace("../html/Main.html");
        } else {
            // 처음 사용자일 경우
            opener.sessionStorage.setItem("info", JSON.stringify(info));
            opener.location.replace("../html/JoinForOauth.html");
        }
    } catch(error) {
        console.log(error);
    } finally {
        self.close();
    }
}