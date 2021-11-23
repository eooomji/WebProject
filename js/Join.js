/* 회원가입 직접접근 처리 */
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

/* 아이디 입력표시와, 캡션정보 켜고 크는 함수 정의 */
// 캡션정보 띄우기
const caption_print = (num, text) => {
    let x = document.getElementsByClassName("warning_text")[num];
    x.innerText = text;
    x.style.display = "inline";
}

// 캡션정보 숨기기
const caption_hide = (num) => {
    let x = document.getElementsByClassName("warning_text")[num];
    x.style.display = "none";
}

// * 보이기
const star_visible = (num) => {
    let x = document.getElementsByClassName("signup_label_star")[num];
    x.style.display = "inline";
}

// * 숨기기
const star_hide = (num) => {
    let x = document.getElementsByClassName("signup_label_star")[num];
    x.style.display = "none";
}

/* 분야 선택 체크여부 비트 연산자로 인코딩 */
const choice_encoding = () => {
    const exercise = document.querySelector(".exercise").checked;
    const habit = document.querySelector(".habit").checked;
    const manner = document.querySelector(".manner").checked;
    const study = document.querySelector(".study").checked;

    return exercise * 1 + habit * 2 + manner * 4 + study * 8;
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
        caption_print(0, "6~20자 대소문자 영문부터 시작하여 숫자, 대소문자 영문만 입력 가능합니다.");
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
        caption_print(1, "8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.");
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

// Name 유효성 체크
const checkName = () => {
    const name = document.querySelector(".name").value;

    if(name === "") {
        caption_print(3, "필수 정보입니다.");
        star_visible(3);
        return false;
    } else if(!ValidateName(name)) {
        caption_print(3, "한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)");
        star_visible(3);
        return false;
    } else {
        star_hide(3);
        caption_hide(3);
        return true;
    }
}

// e-mail 유효성 체크
const checkEmail = () => {
    const email = document.querySelector(".email").value;

    if(email === "") {
        caption_print(4, "필수 정보입니다.");
        star_visible(4);
        return false;
    } else if(!ValidateEmail(email)) {
        caption_print(4, "이메일 형식에 알맞게 입력해주세요. ex) test@site.com");
        star_visible(4);
        return false;
    } else {
        star_hide(4);
        caption_hide(4);
        return true;
    }
}

/* 가입하기 버튼을 눌렀을 경우 - PHP 통신 -> DB에 값 집어넣기 */
const join_demand = async() => {
    // DOM 조작
    const userID = document.querySelector(".userID").value;
    const userPW = document.querySelector(".userPW").value;
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const choice = choice_encoding();

    if(await checkID() & checkPW() & checkPWConfirm() & checkName() & checkEmail()) {
        try {
            const response = await axios.post("../php/Join.php", {
                username : userID,
                password : userPW,
                name : name,
                email : email,
                choice : choice
            });
            if (response.data) {
                // 회원가입 성공 시
                alert("회원가입 성공!");
                try {
                    const res = await axios.post("../php/login.php", {
                        username : username,
                        password : password
                    });
            
                    if(res.data) {
                        location.replace("../html/Main.html");
                    } else {
                        alert("예기치 못한 에러가 발생하였습니다. 관리자에게 문의주십시오.");
                    }
                } catch (error) {
                    console.log(error);
                }
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
const join_cancel = () => {
    location.replace("../html/Login.html");
}

/* 입력 정규식 검사 */
// 아이디 검사
const ValidateID = (userID) => {
    // 6~20자 대소문자 영문부터 시작하여 숫자, 대소문자 영문만 입력 가능
    const re = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;
    return re.test(userID);
};

// 패스워드 검사
const ValidatePW = (userPW) => {
    // 6~20자 영어, 숫자 중 하나 이상 모두 포함
    const re = /^(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/;
    return re.test(userPW);
};

// 패스워드와 패스워드 확인이 같은지 검사
const ValidatePWConfirm = (userPW, userPWConfirm) => {
    // 비밀번호와 비밀번호 확인이 같은지 확인
    return userPW === userPWConfirm;
};

// 이름 검사
// 한국에서 가장 긴 이름 17자리
const ValidateName = (name) => {
    // 완성형 한글 2 ~ 17자
    const re = /^[가-힣]+[가-힣]{1,17}$/;
    return re.test(name);
};

// 이메일 검사
const ValidateEmail = (email) => {
    const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return re.test(email)
}