/* 아이디 입력표시와, 캡션정보 켜고 크는 함수 정의 */
// 캡션정보 띄우기
const caption_print = (num, text) => {
    let x = document.getElementsByClassName("warning_text")[num];
    x.innerText = text;
    x.style.display = "inline";
    x.style.color = "red";
}

// 캡션정보 숨기기
const caption_hide = (num) => {
    let x = document.getElementsByClassName("warning_text")[num];
    x.style.display = "none";
    x.style.color = "red";
}

// * 보이기
const star_visible = (num) => {
    let x = document.getElementsByClassName("signup_label_star")[num];
    x.style.display = "inline";
    x.style.color = "red";
}

// * 숨기기
const star_hide = (num) => {
    let x = document.getElementsByClassName("signup_label_star")[num];
    x.style.display = "none";
    x.style.color = "red";
}

/* 분야 선택 체크여부 비트 연산자로 인코딩 */
const choice_encoding = () => {
    const exercise = document.querySelector(".exercise").checked;
    const volunteer = document.querySelector(".volunteer").checked;
    const habit = document.querySelector(".habit").checked;
    const manner = document.querySelector(".manner ").checked;

    return exercise * 1 + volunteer * 2 + habit * 4 + manner * 8;
}

/* 아이디 중복 확인 */
const idOverlapCheck = async() => {
    const userID = document.querySelector(".userID").value;
    if(!(userID === "")) {
        try {
            const response = await axios.post("../php/idOverlapCheck.php", {
                username : userID
            });
            if(response.data) {
                return true;
            } else {
                return false;
            }
        } catch(error) {
            console.log(error);
        }
    }
}

/* 입력 정보 유효성 체크 */
// ID 유효성 체크
const checkID = async() => {
    const userID = document.querySelector(".userID").value;
    
    if(userID === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(!ValidateID(userID)) {
        caption_print(0, "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
        star_visible(0);
        return false;
    } else if(await idOverlapCheck()) {
        caption_print(0, "아이디가 중복됩니다.");
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
        caption_print(1, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
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
        caption_print(2, "비밀번호가 일치하지 않습니다.");
        star_visible(2);
        return false;
    } else {
        star_hide(2);
        caption_hide(2);
        return true;
    }
}

// NickName 유효성 체크
const checkNickName = () => {
    const nickname = document.querySelector(".nickname").value;

    if(nickname === "") {
        caption_print(3, "필수 정보입니다.");
        star_visible(3);
        return false;
    } else if(!ValidateNickName(nickname)) {
        caption_print(3, "한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)");
        star_visible(3);
        return false;
    } else {
        star_hide(3);
        caption_hide(3);
        return true;
    }
}

// 미션생성시간 유효성 체크
const checkMissionTime = () => {
    const missionTime = document.querySelector(".missionTime").value;
    if(missionTime === "") {
        caption_print(4, "시간을 지정해 주십시오.");
        star_visible(4);
        return false;
    } else {
        star_hide(4);
        caption_hide(4);
        return true;
    }
}

/* 가입하기 버튼을 눌렀을 경우 - PHP 통신 -> DB에 값 집어넣기*/
const sign_up_demand = async() => {
    // DOM 조작
    const userID = document.querySelector(".userID").value;
    const userPW = document.querySelector(".userPW").value;
    const nickname = document.querySelector(".nickname").value;
    const missionTime = document.querySelector(".missionTime").value;
    const choice = choice_encoding();

    if(await checkID() & checkPW() & checkPWConfirm() & checkNickName() & checkmissionTIme()) {
        try {
            const response = await axios.post("../php/signup.php", {
                username : userID,
                password : userPW,
                nickname : nickname,
                missionTime : missionTime,
                choice : choice
            });
            if (response.data) {
                // 회원가입 성공 시
                alert("회원가입 성공!");
                location.replace("../index.html");
            } else {
                // 회원가입 실패 시
                alert("회원가입 실패!");
            }
        } catch(error) {
            console.log(error);
        }
    }
};

/* 취소하기 버튼을 눌렀을 경우 -> 메인페이지로 돌아가기 */
const sign_up_cancel = () => {
    location.replace("../html/loginpage.html");
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