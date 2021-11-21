const naverLogin = new naver.LoginWithNaverId(
    {
            clientId : "lu6p3IJh8_cSRKZpHEkS",
            callbackUrl : "http://localhost/html/OauthRedirect.html",
            isPopup : true,
            callbackHandle : true
    }
);

naverLogin.init();

window.addEventListener('load', function() {
    naverLogin.getLoginStatus(function (status) {
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

            self.close();
            
        } else {
            console.log("callback 처리에 실패하였습니다.");
        }
    });
});