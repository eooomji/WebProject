onload = () => {
    info = JSON.parse(localStorage.getItem("info"));
    localStorage.clear();
    document.querySelector(".kakaoID").value = info["username"];
    document.querySelector(".nickname").value = info["nickname"];
}

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
    let x = document.getElementsByClassName("kakao_signup_label_star")[num];
    x.style.display = "inline";
    x.style.color = "red";
}

// * 숨기기
const star_hide = (num) => {
    let x = document.getElementsByClassName("kakao_signup_label_star")[num];
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

const k_sign_up_demand = async() => {
    const userID = document.querySelector(".kakaoID").value;
    const nickname = document.querySelector(".nickname").value;
    const tel = document.querySelector(".tel").value;
    const choice = choice_encoding();

    if (checkNickName() & checkTel()) {
        try {
            const response = await axios.post("../php/kakaoSignup.php", {
                username : userID,
                nickname : nickname,
                tel : tel.substring(3, 11),
                choice : choice
            });

            if(response.data) {
                alert("회원가입 성공!");
                location.replace("../index.html");
            } else {
                alert("회원가입 실패!");
            }
        } catch(error) {
        console.log(error);
        }
    }
}

// NickName 유효성 체크
const checkNickName = () => {
    const nickname = document.querySelector(".nickname").value;

    if(nickname === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(!ValidateNickName(nickname)) {
        caption_print(0, "한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)");
        star_visible(0);
        return false;
    } else {
        star_hide(0);
        caption_hide(0);
        return true;
    }
}

// 휴대폰번호 유효성 체크 @
const checkTel = () => {
    const tel = document.querySelector(".tel").value;

    if(tel === "") {
        caption_print(1, "필수 정보입니다.");
        star_visible(1);
        return false;
    } else if(!ValidateTel(tel)) {
        caption_print(1, "형식에 맞지 않는 번호입니다.");
        star_visible(1);
        return false;
    } else {
        star_hide(1);
        caption_hide(1);
        return true;
    }
}

// 정규식 나중에 바꿔야함
/* 입력 유효성 검사 (정규식 활용) */
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