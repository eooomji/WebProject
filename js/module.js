// 세션체크 함수를 여기저기서 사용하기 때문에 모듈로 지정
const SessionCheck = async () => {
	try {
		const response = await axios.get("../php/sessionCheck.php");
		if (response.data) {
			;
		} else {
			location.replace("../html/login.html");
		}
	} catch (error) {
		console.log(error);
	}
};
