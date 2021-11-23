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
