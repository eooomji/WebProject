const findPW_demand = async() => {
    const username = document.querySelector(".userID").value;
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;

    if(checkID() & checkName() & checkEmail()) {
        try {
            const response = await axios.post("../php/CheckPW.php", {
                username : username,
                name : name,
                email : email
            });
            if(response.data === true) {
                alert("유저 정보가 확인되었습니다. 비밀번호 변경창으로 넘어갑니다.");
                sessionStorage.setItem("username", username);
                location.replace("../html/ChangePW.html");
            } else {
                alert("사용자 정보에 맞는 아이디는 존재하지 않습니다. 다시 입력해주세요");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const findPW_cancle = () => {
    location.replace("../html/Login.html");
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

/* 입력 정보 유효성 체크 */
// ID 유효성 체크
const checkID = () => {
    const userID = document.querySelector(".userID").value;
    
    if(userID === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(!ValidateID(userID)) {
        caption_print(0, "6~20자 대소문자 영문부터 시작하여 숫자, 대소문자 영문만 입력 가능합니다.");
        star_visible(0);
        return false;
    } else {
        star_hide(0);
        caption_hide(0);
        return true;
    }
}

// Name 유효성 체크
const checkName = () => {
    const name = document.querySelector(".name").value;

    if(name === "") {
        caption_print(1, "필수 정보입니다.");
        star_visible(1);
        return false;
    } else if(!ValidateName(name)) {
        caption_print(1, "이름을 정확히 입력해주세요. (특수기호, 영문, 공백 사용 불가)");
        star_visible(1);
        return false;
    } else {
        star_hide(1);
        caption_hide(1);
        return true;
    }
}

// e-mail 유효성 체크
const checkEmail = () => {
    const email = document.querySelector(".email").value;

    if(email === "") {
        caption_print(2, "필수 정보입니다.");
        star_visible(2);
        return false;
    } else if(!ValidateEmail(email)) {
        caption_print(2, "이메일 형식에 알맞게 입력해주세요. ex) test@site.com");
        star_visible(2);
        return false;
    } else {
        star_hide(2);
        caption_hide(2);
        return true;
    }
}

/* 입력 정규식 검사 */
// 아이디 검사
const ValidateID = (userID) => {
    // 6~20자 대소문자 영문부터 시작하여 숫자, 대소문자 영문만 입력 가능
    const re = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;
    return re.test(userID);
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