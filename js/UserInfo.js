
const init = () => {
	//LoadUser();
	DisableUserInfoChange(true);
}

const LoadUser = () => {
	fetch('http://127.0.0.1:8000/', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return Response.statusText === "OK" ? Response.json() : alert(Response.statusText);
	}).then((Result) => {
		if (Result == null) { return; }
		Object.keys(Result).forEach((element) => {
			let target = document.getElementsByName(element);
			Result[element].split('-').forEach((elem, index, arr) => {
				target = index < arr.length ? target[elem] : elem;
				}
			);
		});
	});
}

const DisableUserInfoChange = (IsDisable) => {
	EachUserInfoElement('UserInfo', (element) => {
		element.disabled = IsDisable;
	});
	document.getElementById('changeinfo').style.visibility = IsDisable ? 'hidden' : 'visible';
}

const SendChange = (ChangeTarget) => {
	const TargetContainer = document.getElementById(ChangeTarget);
	TargetContainer.querySelector('#LoadingCircle').style.visibility = 'visible';
	const Data = {};
	EachUserInfoElement(ChangeTarget, (element) => {
		Data[element.name] = element.value;
	});
	fetch('http://127.0.0.1:8000/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data) }).then(Response => {
		const IsSuccess = Response.statusText === "OK" ? true : false;
		if (ChangeTarget === 'UserInfo') {
			DisableUserInfoChange(IsSuccess);
		}
		return Response.json();
	}).then((ResponseJson) => {
		TargetContainer.getElementById('LoadingCircle').style.visibility = 'hidden';
		TargetContainer.getElementById('ResultInfo').textContent = ResponseJson["Message"];
	});
}


const EachUserInfoElement = (target, func) => {
	document.querySelectorAll(`#${target}Item`).forEach((element) => {
		func(element);
	});
}
