let info;

onload = () => {
    info = JSON.parse(sessionStorage.getItem("info"));
    if(info === undefined || info === null) {
        alert("잘못된 접근입니다.");
        location.replace("../html/Login.html");
    }
    document.querySelector(".kakaoID").value = info.username;
    document.querySelector(".name").value = info.name;
    document.querySelector(".email").value = info.email;
}

const k_sign_up_demand = async() => {
    const userID = document.querySelector(".kakaoID").value;
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const choice = choice_encoding();

    if (checkID() & checkName() & checkEmail()) {
        try {
            const response = await axios.post("../php/JoinForOauth.php", {
                username : userID,
                name : name,
                email : email,
                choice : choice
            });

            if(response.data) {
                alert("회원가입 성공!");
                sessionStorage.clear();
                const res = await axios.post("../php/LoginForOauth.php", {
                    username : userID
                });
                
                if(res.data) {
                    // 기존 사용자일 경우
                    location.replace("../html/Main.html");
                } else {
                    // 처음 사용자일 경우
                    sessionStorage.setItem("info", JSON.stringify(info));
                    location.replace("../html/JoinForOauth.html");
                }
            } else {
                alert("회원가입 실패!");
            }

        } catch(error) {
            console.log(error);
        }
    }
}

const checkID = () => {
    const userID = document.querySelector(".kakaoID").value;
    if(userID === undefined || userID === null) {
        alert("예기치 못한 에러가 발생하였습니다. 로그인 페이지로 돌아갑니다.");
        location.replace("../html/Login.html");
    }
}

// Name 유효성 체크
const checkName = () => {
    const name = document.querySelector(".name").value;

    if(name === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(!ValidateName(name)) {
        caption_print(0, "이름을 정확히 입력해주세요. (특수기호, 영문, 공백 사용 불가)");
        star_visible(0);
        return false;
    } else {
        star_hide(0);
        caption_hide(0);
        return true;
    }
}

// e-mail 유효성 체크
const checkEmail = () => {
    const email = document.querySelector(".email").value;

    if(email === "") {
        caption_print(1, "필수 정보입니다.");
        star_visible(1);
        return false;
    } else if(!ValidateEmail(email)) {
        caption_print(1, "이메일 형식에 알맞게 입력해주세요. ex) test@site.com");
        star_visible(1);
        return false;
    } else {
        star_hide(1);
        caption_hide(1);
        return true;
    }
}

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

/* 취소하기 버튼을 눌렀을 경우 -> 메인페이지로 돌아가기 */
const sign_up_cancel = () => {
    sessionStorage.clear();
    location.replace("../html/Login.html");
}

// 이름 검사
// 한국에서 가장 긴 이름 17자리
const ValidateName = (name) => {
    // 완성형 한글 3 ~ 17자
    const re = /^[가-힣]+[가-힣]{2,17}$/;
    return re.test(name);
};

// 이메일 검사
const ValidateEmail = (email) => {
    const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return re.test(email)
}