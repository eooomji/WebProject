// 아이디 비밀번호 등을 객체로 지정해도 괜찮을까? -> 함수호출도 안되고 저장장치일 뿐임

/* 아이디 입력표시와, 캡션정보 켜고 크는 함수 정의 */
const caption_print = (num, text) => {
    let x = document.getElementsByClassName("warning_text")[num];
    x.innerText = text;
    x.style.display = "inline"
}

const caption_hide = (num) => {
    let x = document.getElementsByClassName("warning_text")[num];
    x.style.display = "none";
}

const star_visible = (num) => {
    let x = document.getElementsByClassName("signup_label_star")[num];
    x.style.display = "inline";
}

const star_hide = (num) => {
    let x = document.getElementsByClassName("signup_label_star")[num];
    x.style.display = "none";
}


const choice_encoding = () => {
    const exercise = document.querySelector(".exercise").value;
    const volunteer = document.querySelector(".volunteer").value;
    const habit = document.querySelector(".habit").value;
    const manner = document.querySelector(".manner ").value;

    return exercise*1 + volunteer*2 + habit*4 + manner*8;
}

const choice_decoding = () => {
    const choice = 15;
    if((choice & Math.pow(2, 0)) === Math.pow(2, 0)) alert("exercise");
    if((choice & Math.pow(2, 1)) === Math.pow(2, 1)) alert("volunteer");
}


/* 입력 정보 유효성 체크 */
// ID 유효성 체크
const checkID = () => {
    const userID = document.querySelector(".userID").value;
    
    if(userID === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(!ValidateID(userID)) {
        caption_print(0, "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.")
        star_visible(0);
        return false;
    } else {
        star_hide(0);
        caption_hide(0);
        return true;
    }
}

// PW 유효성 체크
const checkPW = () => {
    const userPW = document.querySelector(".userPW").value;

    if(userPW === "") {
        caption_print(1, "필수 정보입니다.");
        star_visible(1);
        return false;
    } else if(!ValidatePW(userPW)) {
        caption_print(1, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        star_visible(1);
        return false;
    } else {
        star_hide(1);
        caption_hide(1);
        return true;
    }
}

// PW와 PWConfirm이 맞는지 체크
const checkPWConfirm = () => {
    const userPW = document.querySelector(".userPW").value;
    const userPWConfirm = document.querySelector(".userPWConfirm").value;

    if(userPWConfirm === "") {
        caption_print(2, "필수 정보입니다.");
        star_visible(2);
        return false;
    } else if(!ValidatePWConfirm(userPW, userPWConfirm)) {
        caption_print(2, "비밀번호가 일치하지 않습니다.")
        star_visible(2);
        return false;
    } else {
        star_hide(2);
        caption_hide(2);
        return true;
    }
}

// NickName 체크
const checkNickName = () => {
    const nickname = document.querySelector(".nickname").value;

    if(nickname === "") {
        caption_print(3, "필수 정보입니다.");
        star_visible(3);
        return false;
    } else if(!ValidateNickName(nickname)) {
        caption_print(3, "한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)")
        star_visible(3);
        return false;
    } else {
        star_hide(3);
        caption_hide(3);
        return true;
    }
}

// 휴대폰번호 체크
const checkTel = () => {
    const tel = document.querySelector(".tel").value;

    if(tel === "") {
        caption_print(4, "필수 정보입니다.");
        star_visible(4);
        return false;
    } else if(!ValidateTel(tel)) {
        caption_print(4, "형식에 맞지 않는 번호입니다.")
        star_visible(4);
        return false;
    } else {
        star_hide(4);
        caption_hide(4);
        return true;
    }
}

/* PHP 통신 */
const sign_up_demand = async() => {
    const userID = document.querySelector(".userID").value;
    const userPW = document.querySelector(".userPW").value;
    const nickname = document.querySelector(".nickname").value;
    const tel = document.querySelector(".tel").value;
    const choice = choice_encoding();

    if( checkID() && checkPW() && checkPWConfirm() && checkNickName() && checkTel) {
        try {
            const response = await axios.post("../php/signup.php", {
                username : userID,
                password : userPW,
                nickname : nickname,
                tel : tel,
                choice : choice
            });
            if (response.data) {
                // 회원가입 성공 시
                location.replace("../html/forget_id.html");
            } else {
                // 회원가입 실패 시
                alert("회원가입 실패!");
            }
        } catch(error) {
            console.log(error);
        }
    }
};

const sign_up_cancel = () => {
    location.href="../index.html";
}

// 정규식 나중에 바꿔야함
/* 입력 유효성 검사 (정규식 활용) */
const ValidateID = (userID) => {
    // 6~20자 소문자부터 시작 / 숫자, 소문자 영문만 입력 가능
    const re = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;
    return re.test(userID);
};

const ValidatePW = (userPW) => {
    // 6~20자 영어, 숫자 중 하나 이상 모두 포함
    const re = /^(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/;
    return re.test(userPW);
};

const ValidatePWConfirm = (userPW, userPWConfirm) => {
    // 비밀번호와 비밀번호 확인이 같은지 확인
    return userPW === userPWConfirm;
};

const ValidateNickName = (nickname) => {
    // 2 ~ 10자 완성형 한글만
    const re = /^[가-힣]+[가-힣]{1,9}$/;
    return re.test(nickname);
};

const ValidateTel = (tel) => {
    // 숫자 11자리 맞는지 확인
    const re = /^[0-9]{11}$/;
    return re.test(tel);
};