
onload = () => {
	SessionCheck();
	LoadUser();
	DisableUserInfoChange(true);
}

const SessionCheck = () => {
	fetch('../php/sessionCheck.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return Response.statusText === "OK" ? Response.json() : alert(`${Response.status} ${Response.statusText}`);
	}).then(Result => {
		if (!Result) {
			location.replace("../html/loginpage.html");
		}
	});
}

const LoadUser = () => {
	fetch('../php/LoadUser.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return Response.statusText === "OK" ? Response.json() : alert(Response.statusText);
	}).then((Result) => {
		Object.keys(Result).forEach((element) => {
			let target = document.getElementById(element);
			if (target.value != null) {
				target.value = Result[element];
			} else if (target.textContent != null) {
				target.textContent = Result[element];
			}
		});
	});
}

const onClickChangeUserInfo = () => {
	SendChange('UserInfo', (ResponseJson) => {
		ResponseJson["Result"] === "Success" ? DisableUserInfoChange(true) : null;
		SendChangeComplete('UserInfo', ResponseJson);
	});
}

const onClickChangeSetting = () => {
	SendChange('Setting', (ResponseJson) => {
		SendChangeComplete('Setting', ResponseJson);
	});
}

const DisableUserInfoChange = (IsDisable) => {
	EachUserInfoElement('UserInfo', (element) => {
		element.disabled = IsDisable;
	});
	document.getElementById('changeinfo').style.visibility = IsDisable ? 'hidden' : 'visible';
}

const SendChange = (target, ProcessFunc) => {
	const TargetContainer = document.getElementById(target);
	document.getElementById(`${target}LoadingCircle`).style.visibility = 'visible';
	const Data = {};
	EachUserInfoElement(target, (element) => {
		Data[element.id] = element.value;
	});
	fetch('../php/SendChange.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data) }).then(Response => {
		return Response.json();
	}).then((ResponseJson) => {
		ProcessFunc(ResponseJson);
	});
}

const SendChangeComplete = (target, ResponseJson) => {
	document.getElementById(`${target}LoadingCircle`).style.visibility = 'hidden';
	document.getElementById(`${target}Result`).textContent = ResponseJson["Message"];
}

const EachUserInfoElement = (target, func) => {
	document.getElementsByName(`${target}Item`).forEach((element) => {
		func(element);
	});
}
