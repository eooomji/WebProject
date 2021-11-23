let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

// DB에서 미션 다 불러오기
const arr = async(nowMonth, userName) => {
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
};

// 시작시 페이지에 로딩되는 함수 - thisMonth() 오버라이딩
window.onload = async function() {  
  SessionCheck();
  const getName = await axios.get('../php/LoadUser.php');
  let userName = getName.data.username;
  let name = getName.data.name;
  let score = getName.data.score;
  const nowMonth = ToDay.getMonth(); // 현재 Month

  const [y, m] = getDate(new Date(ToDay.setMonth(nowMonth))); 

  const lastDay = getDate(new Date(y, m, 0)).pop() * 1; 
  const day = new Date([y, m, 1].join("-")).getDay() * 1;
  const maxDay = Math.ceil((day + lastDay) / 7) * 7; 

  arr(nowMonth, userName);

  CheckedCnt(nowMonth, userName);

  document.querySelector('.highlight-b').innerText = `${name}`;
  document.querySelector('.highlight-a').innerText = `${score}`;

  const getName = await axios.get('../php/LoadUser.php');
  let userName = getName.data.username;
  const monthDay2 = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth+1});

  let mission = document.querySelector(`.missions${monthDay2.data.length}`);
  mission.style.display='none';
    
  const mission = document.querySelector(`.missions${monthDay2.data.length+1}`);
  mission.style.display=''; 
}
