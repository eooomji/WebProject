
onload = () => {
	SessionCheck(); // module.js
	LoadUser();
	DisableUserInfoChange(true);
}

// 서버로부터 사용자 정보를 받고 표시
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
					case element == 'rank':
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
					case 'IsOAuth': // OAuth 사용자는 아이디와 비밀번호 항목을 제거
						if (ResponseData[element] == true) {
							for (const elem of document.querySelectorAll('.HideOnOAuth')) {
								elem.remove();
							}
						} else {
							document.querySelector('#UserId').origin = document.querySelector('#UserId').value; // 원래 아이디 저장
						}
						break;
					case 'choice': // 분야 선택의 체크박스 설정
						for (const [index, elem] of document.querySelectorAll('#Setting .choice').entries()) {
							elem.checked = (ResponseData[element] & Math.pow(2, index)) != 0 ? true : false;
						}
						break;
					default:
						throw `${error} ${element}`;
				}
			}
		}
	} catch (error) {
		alert(error);
	}
}

// 사용자 정보 변경
const onClickChangeUserInfo = async () => {
	// 입력된 값을 확인
	for (const element of Array.from(document.querySelectorAll('.UserInfoItem'))) {
		if (await DataCheck(element)) {
			return null;
		}
	}

	// 보낼 데이터
	const Data = {};
	for (const element of document.querySelectorAll(`.UserInfoItem`)) {
		if (element.name == 'passwordcheck') { continue; }
		Data[element.name] = element['value'];
	}

	SaveChange('UserInfo', Data, (ResponseData) => {
		if (ResponseData["Result"] === "Success") {
			DisableUserInfoChange(true);
			if (document.querySelector('#UserId') !== null) {
				document.querySelector('#UserId').origin = document.querySelector('#UserId').value; // 저장된 원래 아이디 변경
			}
			document.querySelector(`#UserInfo .Result`).style.color = '#0D6EFD'; // 결과 메세지를 성공 시 파란색으로 변경
		}
	});
}

// 사용자 정보 입력 요소들을 비활성화, 변경 버튼 표시
const DisableUserInfoChange = (IsDisable) => {
	for (const element of document.querySelectorAll('.UserInfoItem')) {
		element.disabled = IsDisable;
	}
	document.getElementById('changeinfo').style.visibility = IsDisable ? 'hidden' : 'visible';
	document.querySelector(`#UserInfo .Result`).style.color = '#FF0000'; // 안내 메세지를 빨간 색으로 설정

}

// 설정 변경
const onClickChangeSetting = () => {
	SaveChange('Setting', { choice: GetChoiceValue() }, (ResponseData) => {
		if (ResponseData["Result"] === "Success") {
			document.querySelector(`#Setting .Result`).style.color = '#0D6EFD';
		} else if (ResponseData["Result"] === "Failure") { // 결과 메세지를 성공 시 파란색, 실패 시 빨간색으로 변경
			document.querySelector(`#Setting .Result`).style.color = '#FF0000';
		}
	});
}

// 분야 선택 사항을 숫자로 계산
const GetChoiceValue = () => {
	let choice = 0;
	for (const [index, element] of document.querySelectorAll('#Setting .choice').entries()) {
		choice += element.checked == true ? Math.pow(2, index) : 0; //  1, 2, 4, 8
	}
	return choice;
}

// 회원 탈퇴
const DeleteAccount = async () => {
	try {
		const Response = await fetch('../php/DeleteAccount.php', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
		if (!Response.ok) {
			throw `${Response.status} ${Response.statusText}`;
		}
		const ResponseData = await Response.json();

		if (ResponseData === true) {
			location.replace("../html/Login.html");
		} else {
			throw `실패`;
		}
	}
	catch (error) {
		alert(error);
	}
}

// 변경사항을 서버로 전송하고 결과 처리
const SaveChange = async (target, Data, ProcessFunc) => {
	document.querySelector(`#${target} .LoadingCircle`).style.visibility = 'visible';
	try {
		const Response = await fetch(`../php/Change${target}.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data) });
		if (!Response.ok) {
			throw `${Response.status} ${Response.statusText}`;
		}
		const ResponseData = await Response.json();

		// 로딩 바, 결과 메세지 표시
		document.querySelector(`#${target} .Result`).textContent = ResponseData["Message"];
		document.querySelector(`#${target} .LoadingCircle`).style.visibility = 'hidden';

		// 결과 처리
		ProcessFunc(ResponseData);
	} catch (error) {
		alert(error);
	}
}

// 입력된 값을 검증
const DataCheck = async (element) => {
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
	if (ErrorMessage === undefined) {
		document.querySelector('#UserInfoResult').textContent = "";
		return false;
	} else {
		document.querySelector('#UserInfoResult').textContent = ErrorMessage;
		return true;
	}
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
			return "비밀번호가 일치하지 않습니다.";
		}
	} else if (!ValidatePW(userPW)) {
		return "비밀번호 : 8~20자 영문 대소문자, 숫자를 조합해주세요.";
	}
}

// PW와 PWConfirm이 맞는지 체크
const checkPWConfirm = (userPWConfirm) => {

	if (userPWConfirm === "" & document.getElementById('UserPassword').value !== "") {
		return "비밀번호가 일치하지 않습니다.";
	} else if (!ValidatePWConfirm(document.getElementById('UserPassword').value, userPWConfirm)) {
		return "비밀번호가 일치하지 않습니다.";
	}
}

// Name 유효성 체크
const checkName = (name) => {

	if (name === "") {
		return "이름 : 필수 정보입니다.";
	} else if (!ValidateName(name)) {
		return "이름 : 한글로 입력하세요. (숫자, 특수기호, 공백 사용 불가)";
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
	// 8~20자 적어도 한개 이상의 대소문자, 숫자, 특수문자가 있어야함.
	const re = /^(?=.{7,20})(?=.*\d)(?=.*[a-zA-Z])(?=.*[$@$!%*?&]).*$/;
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
