import { SessionCheck } from './module.js';

/*/
const SessionCheck = () => {
	fetch('../php/sessionCheck.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		CheckHttpResponseStatus(Response);
	}).then(Result => {
		if (Result === false) {
			location.replace("../html/login.html");
		}
	}).catch(error => {
		alert(error);
	});
}
/*/

const CheckHttpResponseStatus = (res => {
	if (res.statusText === "OK") {
		return res.json();
	} else {
		throw `${res.status} ${res.statusText}`;
	}
})

onload = () => {
	SessionCheck();
	LoadUser();
	DisableUserInfoChange(true);
}

const LoadUser = () => {
	document.getElementsByName(`SettingItem`).forEach((element) => {
		element.checked = true;
		element.checked = false;
	});
	fetch('../php/LoadUser.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return CheckHttpResponseStatus(Response);
	}).then(Result => {
		Object.keys(Result).forEach(element => {
			try {
				const target = document.getElementById(element);
				if (target.checked != null) {
					target.checked = Result[element];
				} else if (target.value != null) {
					target.value = Result[element];
				} else if (target.textContent != null) {
					target.textContent = Result[element];
				}
			} catch (error) {
				switch (element) {
					case 'IsOAuth':
						if (Result[element] == true) {
							document.querySelectorAll('.HideOnOAuth').forEach(element => {
								element.style.display = 'None';
							});
						}
						break;
					default:
						alert(`${error} ${element}`);
				}
			}
		});
	}).catch(error => {
		alert(error);
	});
}


const DisableUserInfoChange = (IsDisable) => {
	document.getElementsByName(`UserInfoItem`).forEach((element) => {
		element.disabled = IsDisable;
	});
	document.getElementById('changeinfo').style.visibility = IsDisable ? 'hidden' : 'visible';
}

const onClickChangeUserInfo = () => {
	SaveChange('UserInfo', 'value', (Result) => {
		Result["Result"] === "Success" ? DisableUserInfoChange(true) : null;
		ShowWaiterForResponse('UserInfo', Result, false);
	});
}

const onClickChangeSetting = () => {
	SaveChange('Setting', GetData('Setting', 'checked'), (Result) => {
		ShowWaiterForResponse('Setting', Result, false);
	});
}

const SaveChange = (target, Data, ProcessFunc) => {
	ShowWaiterForResponse(target, true, true);
	fetch(`../php/Change${target}.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data) }).then(Response => {
		return CheckHttpResponseStatus(Response);
	}).then(Result => {
		ProcessFunc(Result);
	}).catch(error => {
		alert(error);
	});
}

const ShowWaiterForResponse = (target, Result, IsStart) => {
	document.getElementById(`${target}LoadingCircle`).style.visibility = IsStart ? 'visible' : 'hidden';
	document.getElementById(`${target}Result`).textContent = IsStart ? "" : Result["Message"];
}

const GetData = (target, property) => {
	const Data = {};
	document.getElementsByName(`${target}Item`).forEach((element) => {
		Data[element.id] = element[property];
	});
	return Data;
}