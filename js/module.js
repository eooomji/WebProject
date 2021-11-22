const SessionCheck = async () => {
	try {
		const response = await axios.get("../php/sessionCheck.php");
		if (response.data) { // 세션에 로그인정보가 있을 경우
			;
		} else {  // 세션에 로그인정보가 없을 경우
			location.replace("../html/login.html");
		}
	} catch (error) {
		console.log(error);
	}
};
