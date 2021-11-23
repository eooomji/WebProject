/* 세션체크 */
// onload : html문서에 들어왔을 때 연결된 js에 onload가 있을 경우 구문 자동실행
// overriding
onload = async () => {
    SessionCheck();
};

/* 사용자 정보 가져오기 */
const getMyInfo = async() => {
    try {
        const response = await axios.get("../php/getMyInfo.php");
        if(response.data) {
            changeDOM(response.data);
        } else {
            alert("사용자 정보 불러오기 실패 !!!");
        }
    } catch(error) {
        console.log(error);
    }
}

/* 선택값 디코딩 */
const choice_decoding = (encode_number) => {
    if ((encode_number & Math.pow(2, 0)) === Math.pow(2, 0))
        document.querySelector(".exercise").checked = true;
    if ((encode_number & Math.pow(2, 1)) === Math.pow(2, 1))
        document.querySelector(".volunteer").checked = true;
    if ((encode_number & Math.pow(2, 2)) === Math.pow(2, 2))
        document.querySelector(".habit").checked = true;
    if ((encode_number & Math.pow(2, 3)) === Math.pow(2, 3))
        document.querySelector(".manner").checked = true;
}

/* 사용자 정보 출력 */
const changeDOM = (datas) => {
    document.querySelector(".username").value = datas.username;
    document.querySelector(".nickname").value = datas.nickname;
    document.querySelector(".tel").value = "010" + datas.tel;
    choice_decoding(datas.choice);
}