
onload = () => {
<<<<<<< Updated upstream
	SessionCheck();
=======
<<<<<<< HEAD
	SessionCheck(); // module.js
=======
	SessionCheck();
>>>>>>> 3f98b9eb2c5f5a832291ac1dae3d59805cbf8913
>>>>>>> Stashed changes
	LoadUser();
	DisableUserInfoChange(true);
}

const DeleteAccount = async () => {
	try {
		const Response = await fetch('../php/DeleteAccount.php', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
		if (!Response.ok) {
			throw `${Response.status} ${Response.statusText}`;
		}
		const ResponseData = await Response.json();

		if (ResponseData == true) {
			location.replace("../html/Login.html"); // 어디로 ?
		} else {
			throw `실패`;
		}
	}
	catch (error) {
		alert(error);
	}
}

const LoadUser = async () => {
	try {
		const Response = await fetch('../php/LoadUser.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
		if (!Response.ok) {
			throw `${Response.status} ${Response.statusText}`;
		}
		const ResponseData = await Response.json();

		for (const element in ResponseData) {
			let property;
			try {
				switch (true) {
					case element == 'score':
						property = 'textContent';
						break;
					case element == 'choice':
						throw null;
					default:
						property = 'value';
				}
				document.getElementsByName(element)[0][property] = ResponseData[element];
			} catch (error) {
				switch (element) {
					case 'IsOAuth':
						if (ResponseData[element] == true) {
							for(const elem of document.querySelectorAll('.HideOnOAuth')) {
								elem.remove();
							}
						}
						break;
					case 'choice':
						document.querySelectorAll('.choice')[Math.log(ResponseData['choice']) / Math.log(2)].checked = true;
						break;
					default:
						throw `${error} ${element}`;
				}
			}
		}
		document.getElementById('UserId').origin = document.getElementById('UserId').value;
	} catch (error) {
		alert(error);
	}
}

const DisableUserInfoChange = (IsDisable) => {
	for (const element of document.querySelectorAll('.UserInfoItem')) {
		element.disabled = IsDisable;
	}
	document.getElementById('changeinfo').style.visibility = IsDisable ? 'hidden' : 'visible';
}

const onClickChangeUserInfo = async () => {
	if (await DataCheck()) {
		return;
	}
	const Data = {};
	for (const element of document.querySelectorAll(`.UserInfoItem`)) {
		if (element.name == 'passwordcheck') { continue; }
		Data[element.name] = element['value'];
		
	}

	SaveChange('UserInfo', Data, (ResponseData) => {
		if (ResponseData["Result"] === "Success") {
			DisableUserInfoChange(true);
			document.getElementById('UserId').origin = document.getElementById('UserId').value;
		}
	});
}

const onClickChangeSetting = () => {
	SaveChange('Setting', { choice: document.querySelector('.choice:checked').getAttribute('index') }, (ResponseData) => {
		;
	});
}

const SaveChange = async (target, Data, ProcessFunc) => {
	document.getElementById(`${target}LoadingCircle`).style.visibility = 'visible';
	try {
		const Response = await fetch(`../php/Change${target}.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data) });
		if (!Response.ok) {
			throw `${Response.status} ${Response.statusText}`;
		}
		const ResponseData = await Response.json();

		document.getElementById(`${target}Result`).textContent = ResponseData["Message"];
		ProcessFunc(ResponseData);
		document.getElementById(`${target}LoadingCircle`).style.visibility = 'hidden';
	} catch (error) {
		alert(error);
	}
}

const DataCheck = async () => {
	for (const element of Array.from(document.querySelectorAll('.UserInfoItem'))) {
		let ErrorMessage;
		switch (element.id) {
			case 'UserName':
				ErrorMessage = checkName(element.value);
				break;
			case 'UserId':
				ErrorMessage = await checkID(element.value);
				break;
			case 'UserEmail':
				ErrorMessage = checkEmail(element.value);
				break;
			case 'UserPassword':
				ErrorMessage = checkPW(element.value);
				break;
			case 'UserPasswordCheck':
				ErrorMessage = checkPWConfirm(element.value);
				break;
		}
		if (ErrorMessage !== undefined) {
			document.getElementById('UserInfoResult').textContent = ErrorMessage;
			return true;
		}
	}
	document.getElementById('UserInfoResult').textContent = "";
	return false;
}


// Join.js 활용

/* 입력 정보 유효성 체크 */
// ID 유효성 체크
const checkID = async (userID) => {

	if (userID === "") {
		return "아이디 : 필수 정보입니다.";
	} else if (!ValidateID(userID)) {
		return "아이디 : 6~20자 대소문자 영문부터 시작하여 숫자, 대소문자 영문만 입력 가능합니다.";
	} else if (userID !== document.getElementById('UserId').origin & (await axios.post("../php/idOverlapCheck.php", { username: userID })).data == true) {
		return "아이디가 중복됩니다.";
	}
}

// PW 유효성 체크
const checkPW = (userPW) => {

	if (userPW === "") {
		if (document.getElementById('UserPasswordCheck').value !== "") {
			return "비밀번호 : 필수 정보입니다.";
		}
	} else if (!ValidatePW(userPW)) {
		return "비밀번호 : 8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.";
	}
}

// PW와 PWConfirm이 맞는지 체크
const checkPWConfirm = (userPWConfirm) => {

	if (userPWConfirm === "" & document.getElementById('UserPassword').value !== "") {
		return "비밀번호 확인 : 필수 정보입니다.";
	} else if (userPWConfirm !== document.getElementById('UserPassword').value) {
		return "비밀번호가 일치하지 않습니다.";
	}
}

// Name 유효성 체크
const checkName = (name) => {

	if (name === "") {
		return "이름 : 필수 정보입니다.";
	} else if (!ValidateName(name)) {
		return "이름 : 한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)"; // 이게 맞나요??
	}
}

// e-mail 유효성 체크
const checkEmail = (email) => {

	if (email === "") {
		return "이메일 : 필수 정보입니다.";
	} else if (!ValidateEmail(email)) {
		return "이메일 : 이메일 형식에 알맞게 입력해주세요. ex) test@site.com";
	}
}

/* 입력 정규식 검사 */
// 아이디 검사
const ValidateID = (userID) => {
	// 6~20자 대소문자 영문부터 시작하여 숫자, 대소문자 영문만 입력 가능
	const re = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;
	return re.test(userID);
};

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