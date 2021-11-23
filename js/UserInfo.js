
const CheckHttpResponseStatus = res => {
	if (res.statusText === "OK") {
		return res.json();
	} else {
		throw `${res.status} ${res.statusText}`;
	}
}

onload = () => {
	/*SessionCheck();*/
	LoadUser();
	DisableUserInfoChange(true);
}

const LoadUser = () => {
	fetch('../php/LoadUser.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return CheckHttpResponseStatus(Response);
	}).then(Result => {
		Object.keys(Result).forEach(element => {
			try {
				let property;
				switch (true) {
					case element.includes('Setting'):
						property = 'checked';
						break;
					case element.includes('score'):
						property = 'textContent';
						break;
					default:
						property = 'value';
				}
				document.getElementsByName(element)[0][property] = Result[element];
			} catch (error) {
				switch (element) {
					case 'IsOAuth':
						if (Result[element] == true) {
							document.querySelectorAll('.HideOnOAuth').forEach(element => {
								element.remove();
							});
						}
						break;
					case 'choice':
						document.getElementsByName('SettingItem').forEach((element, index) => {
							element.checked = (Result['choice'] & Math.pow(2, index)) != 0 ? true : false;
						});
						break;
					default:
						throw `${error} ${element}`;
				}
			}
		});
	}).catch(error => {
		alert(error);
	})
}

const GetChoiceValue = () => {
	let choice = 0;
	document.getElementsByName('SettingItem').forEach((element, index) => {
		choice += element.checked == true ? Math.pow(2, index) : 0;
	});
	return choice;
}

const DisableUserInfoChange = (IsDisable) => {
	document.querySelectorAll('.UserInfoItem').forEach(element => {
		element.disabled = IsDisable;
	});
	document.getElementById('changeinfo').style.visibility = IsDisable ? 'hidden' : 'visible';
}

const onClickChangeUserInfo = () => {
	if (document.getElementById('UserPassword').value !== document.getElementById('UserPasswordCheck').value) {
		document.querySelector('#UserInfoResult').textContent = `sd`;
		return;
	}
	SaveChange('UserInfo', GetData('UserInfo', 'value'), (Result) => {
		if (Result["Result"] === "Success") {
			DisableUserInfoChange(true);
		}
	});
}

const onClickChangeSetting = () => {
	SaveChange('Setting', { choice: GetChoiceValue() }, (Result) => {
	});
}

const SaveChange = (target, Data, ProcessFunc) => {
	document.getElementById(`${target}LoadingCircle`).style.visibility = 'visible';
	fetch(`../php/Change${target}.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data) }).then(Response => {
		return CheckHttpResponseStatus(Response);
	}).then(Result => {
		document.getElementById(`${target}Result`).textContent = Result["Message"];
		ProcessFunc(Result);
	}).catch(error => {
		alert(error);
	}).finally(() => {
		document.getElementById(`${target}LoadingCircle`).style.visibility = 'hidden';
	});
}

const GetData = (target, property) => {
	const Data = {};
	document.querySelectorAll(`.${target}Item`).forEach((element) => {
		Data[element.name] = element[property];
	});
	return Data;
}