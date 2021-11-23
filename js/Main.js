let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

const CheckHttpResponseStatus = res => {
	if (res.statusText === "OK") {
		return res.json();
	} else {
		throw `${res.status} ${res.statusText}`;
	}
}

onload = () => {
	SessionCheck();
	LoadInfo();
	DisableUserInfoChange(true);
}

//Calander와 UserInfo 통합.
const LoadInfo = () => {
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

    SessionCheck();

    const dateInArr = ['dateIn1', 'dateIn2', 'dateIn3', 'dateIn4', 'dateIn5', 'dateIn6', 'dateIn7', 'dateIn8', 'dateIn9', 'dateIn10', 'dateIn11', 'dateIn12', 'dateIn13', 'dateIn14', 'dateIn15', 'dateIn16', 'dateIn17', 'dateIn18', 'dateIn19', 'dateIn20', 'dateIn21', 'dateIn22', 'dateIn23', 'dateIn24', 'dateIn25', 'dateIn26', 'dateIn27', 'dateIn28', 'dateIn29', 'dateIn30', 'dateIn31'];
    const getName = await axios.get('../php/LoadUser.php');
    let userName = getName.data.username;
    const monthDay2 = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth+1});

    let mission = document.querySelector(`.missions${monthDay2.data.length}`);
    mission.style.display='none';
    
    const mission = document.querySelector(`.missions${monthDay2.data.length+1}`);
    mission.style.display='';  
}

// 미션 위젯에서 오늘 미션 보여주기
const arr = async(nowMonth) => {
  try {
    let missionHTML = '';
    const response = await axios.post('../php/getMissions.php', {userName: userName, nowMonth: nowMonth+1});
    const checkTrue = await axios.post('../php/getCheck.php', {userName: userName, nowMonth: nowMonth+1});
    const monthDay = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth+1});

    if(response.data) {
      let checkTrueNum = checkTrue.data.length;
      let j = 0;

      if(checkTrue.data) {
        for (let i = 0; i < monthDay.data.length; i++) {
          if(response.data[i] === undefined) response.data[i] = {content : ""};
          else if (i + 1 == checkTrue.data[j][`DAY(date)`]) {
            missionHTML += `<div class="oneDateSel missions${i+1}"><input class="form-check-input" type="checkbox" name="${nowMonth+1}" onclick='getCheckedCnt(${i+1}, ${nowMonth+1})' checked />${response.data[i].missionName}</div>`;
            if(j < checkTrueNum - 1) j++;
          }
          else {
            missionHTML += `<div class="oneDateSel missions${i+1}"><input class="form-check-input" type="checkbox" name="${nowMonth+1}" onclick='getCheckedCnt(${i+1}, ${nowMonth+1})'>${response.data[i].missionName}</div>`;       
          }
        }
      }
      else {
        for (let i = 0; i < monthDay.data.length; i++) {
          if(response.data[i] === undefined) response.data[i] = {content : ""};
          else missionHTML += `<div class="oneDateSel missions${i+1}"><input class="form-check-input" type="checkbox" name="${nowMonth+1}" onclick='getCheckedCnt(${i+1}, ${nowMonth+1})'>${response.data[i].missionName}</div>`;
        }
      }
    } 
    else {
      alert(`${nowMonth+1}월의 미션 데이터가 없어 로딩 실패`);
    }
    j = 0;
    document.querySelector('.missionName').innerHTML = missionHTML;

    // let last1 = document.querySelector(`.dateIn31`) ? 31 : 30; 
    for (let i = 1; i <= monthDay.data.length; i++) {
        let mission = document.querySelector(`.missions${i}`);
        mission.style.display='none';
    }
  } catch(error) {
  console.log(error); 
  } 
}

// 값이 1로 하나씩 바뀔 때마다 스코어가 1씩 증가! 
const changeScore = async() => {
  try {
    let response = await axios.post('../php/changeScore.php', {userName: userName});
  
    if(response.data) {
      console.log("점수가 증가하였습니다.");
    } else {
        alert("점수 증가 실패!");
    }
  } catch(error) {
  console.log(error); 
  } 
};


// DB isDone 값 0 -> 1로 변경
const changeCB = async(i, nowMonth) => {
  try {
    let nowDay = i;
    userName = 'eooomji';
    const response = await axios.post('../php/changeCheck.php', {nowMonth: nowMonth, nowDay: nowDay, userName: userName});

    if(response.data) {
      // console.log(response.data);
    } else {
        alert("실패!");
    }
  } catch(error) {
  console.log(error); 
  } 
};
