const SessionCheck = async () => {
	try {
		const response = await axios.get("../php/sessionCheck.php");
		if (response.data) { // ���ǿ� �α��������� ���� ���
			;
		} else {  // ���ǿ� �α��������� ���� ���
			location.replace("../html/login.html");
		}
	} catch (error) {
		console.log(error);
	}
};
