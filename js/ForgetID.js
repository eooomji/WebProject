const findID_demand = async() => {
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    if(checkName() & checkEmail()) {
        try {
            const response = await axios.post("../php/checkID.php", {
                name : name,
                email : email
            });
            if(response.data) {
                const username = response.data.username;
                document.getElementById("print").innerHTML = name + "의 아이디는 &lt;<span>" + username + "</span>&gt; 입니다.";
                document.querySelector(".name").disabled = true;
                document.querySelector(".email").disabled = true;
                document.querySelector("#cancle").style.display = "none";
                document.querySelector("#demand").style.display = "none";
                document.querySelector("#pass").style.display = "block";
            } else {
                alert("사용자 정보에 맞는 아이디는 존재하지 않습니다. 다시 입력해주세요");
            }
        } catch (error) {
            console.log(error);
        }
    } 
}

const pass = () => {
    location.replace("../html/Login.html");
}

const findID_cancle = () => {
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

// Name 유효성 체크
const checkName = () => {
    const name = document.querySelector(".name").value;

    if(name === "") {
        caption_print(0, "필수 정보입니다.");
        star_visible(0);
        return false;
    } else if(Validatenbsp(name)) {
        caption_print(0, "공백문자가 있습니다.");
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
    } else if(Validatenbsp(email)) {
        caption_print(1, "공백문자가 있습니다.");
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

/* 정규식을 이용한 유효성 검사 */
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

// 공백검사
const Validatenbsp = (target) => {
    const re = /[\s]/g;
    return re.test(target);
}