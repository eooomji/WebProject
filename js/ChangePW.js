onload = () => {
    const value = sessionStorage.getItem("username");
    if(value === undefined || value === null) {
        alert("잘못된 접근입니다.");
        location.replace("../html/Login.html");
    }
}

const changePW_demand = async() => {
    const username = sessionStorage.getItem("username");
    sessionStorage.removeItem("username");
    const userPW = document.querySelector(".userPW").value;

    if(checkPW() & checkPWConfirm()) {
        try {
            const response = await axios.post("../php/changePW.php", {
                username : username,
                password : userPW
        });
            if(response.data) {
                document.getElementById("print").innerText = "비밀번호 변경에 성공하였습니다.";
                document.querySelector(".userPW").style.display = "none";
                document.querySelector(".userPWConfirm").style.display = "none";
                document.querySelector("#PW").style.display = "none";
                document.querySelector("#PWC").style.display = "none";
                document.querySelector("#cancle").style.display = "none";
                document.querySelector("#demand").style.display = "none";
                document.querySelector("#pass").style.display = "block";
            } else {
                alert("예기치 못한 오류로 비밀번호 변경에 실패했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const pass = () => {
    location.replace("../html/Login.html");
}

const changePW_cancle = () => {
    location.replace("../html/Login.html");
}

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

// PW 유효성 체크
const checkPW = () => {
    const userPW = document.querySelector(".userPW").value;

    if(userPW === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(!ValidatePW(userPW)) {
        caption_print(0, "8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.");
        star_visible(0);
        return false;
    } else {
        star_hide(0);
        caption_hide(0);
        return true;
    }
}

// PW와 PWConfirm이 맞는지 체크
const checkPWConfirm = () => {
    const userPW = document.querySelector(".userPW").value;
    const userPWConfirm = document.querySelector(".userPWConfirm").value;

    if(userPWConfirm === "") {
        caption_print(1, "필수 정보입니다.");
        star_visible(1);
        return false;
    } else if(!ValidatePWConfirm(userPW, userPWConfirm)) {
        caption_print(1, "비밀번호가 일치하지 않습니다.");
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