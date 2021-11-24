const changePW_demand = async() => {
    const username = sessionStorage.getItem("username");
    const userPW = document.querySelector(".userPW").value;
    const userPWConfirm = document.querySelector(".usrPWConfirm").value;

    if(checkPW() & checkPWConfirm()) {
        try {
            const response = await axios.post("../php/changePW.php", {
                username : username,
                password : userPW,
        });
            if(response.data) {
                alert(username);
            } else {
                alert("예기치 못한 오류로 정보를 가져오지 못했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("예기치 못한 오류로 정보를 가져오기 못했습니다.");
    }
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