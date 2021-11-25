let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); // 현재 월을 받아오는 nowMonth : 사용자가 달력 넘길 때 마다 변함

// DB에서 로그인한 사용자 이름, 현재 달에 해당하는 미션 불러오기
const arr = async(nowMonth, userName) => {
  try {
    let missionHTML = ''; // html 정보를 넣어줄 변수
    nowMonth = nowMonth+1;
    if (nowMonth > 12) nowMonth = 1;
    if (nowMonth < 1) nowMonth = 12;

    const response = await axios.post('../php/getMissions.php', {userName: userName, nowMonth: nowMonth}); // 미션 내용 
    const checkTrue = await axios.post('../php/getCheck.php', {userName: userName, nowMonth: nowMonth}); // 미션 check된 날짜들
    const monthDay = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth}); // 현재 월에 해당되는 날짜들을 배열로 받아옴

    if(response.data) {
      let checkTrueNum = checkTrue.data.length;  // 현재 월에 해당하는 날짜 길이(크기)
      let j = 0;``

      if(checkTrue.data) { // check된 미션에 해당하는 날짜가 있는 경우
        for (let i = 0; i < monthDay.data.length; i++) { // 현재 월에 해당하는 날짜 크기만큼 반복문 돌리며 미션 넣어줌
          if(response.data[i] === undefined) response.data[i] = {content : ""}; // undefined일 경우 NULL 값 넣어줌
          else if (i + 1 == checkTrue.data[j][`DAY(date)`]) { // 미션이 check 되어있는 날짜인 경우
            // checkbox가 check된 것으로 html에 넣어줌
            missionHTML += `<div class="oneDateSel missions${i+1}"><input class="form-check-input" type="checkbox" name="${nowMonth}" onclick='getCheckedNum(${i+1}, ${nowMonth})' checked />${response.data[i].missionName}</div>`;
            document.querySelector('.missionName').innerHTML = missionHTML;
            document.querySelector(`.dateIn${i+1}`).style.backgroundColor = '#c4dbed'; // backgroundColor도 하늘색으로 변경해 체크된 걸 시각적으로 보여줌
            if(j < checkTrueNum - 1) j++; // j 값 증가 : check 되어있는 날짜 배열 인덱스 값 증가
          }
          // check 되어있는 날짜가 아닌 경우 check 안 된 checkbox로 html에 넣어줌
          else {
            missionHTML += `<div class="oneDateSel missions${i+1}"><input class="form-check-input" type="checkbox" name="${nowMonth}" onclick='getCheckedNum(${i+1}, ${nowMonth})'>${response.data[i].missionName}</div>`;       
            document.querySelector('.missionName').innerHTML = missionHTML;
          }
        }
      }
      // check된 미션에 해당하는 날짜가 하나도 없는 경우 - 모두 check 안 된 checkbox로 html에 넣어줌
      else {
        for (let i = 0; i < monthDay.data.length; i++) {
          if(response.data[i] === undefined) response.data[i] = {content : ""};
          else missionHTML += `<div class="oneDateSel missions${i+1}"><input class="form-check-input" type="checkbox" name="${nowMonth}" onclick='getCheckedNum(${i+1}, ${nowMonth})'>${response.data[i].missionName}</div>`;
          document.querySelector('.missionName').innerHTML = missionHTML;
        }
      }
    } 
    // nowMonth에 해당하는 미션이 없을 경우 띄워주는 경고창
    else {
      alert(`${nowMonth}월의 미션 데이터가 없어 로딩 실패`);
    }
    j = 0; // j값 0으로 초기화

    for (let i = 1; i <= monthDay.data.length; i++) { // 미션 항목들 숨겨줌
        let mission = document.querySelector(`.missions${i}`);
        mission.style.display='none';
    }
  } catch(error) {
  console.log(error); 
  } 
};

// 클릭하면 해당 일에 해당되는 미션 보여주는 함수
const handleClick = async (event) => {
    const dateInArr = ['dateIn1', 'dateIn2', 'dateIn3', 'dateIn4', 'dateIn5', 'dateIn6', 'dateIn7', 'dateIn8', 'dateIn9', 'dateIn10', 'dateIn11', 'dateIn12', 'dateIn13', 'dateIn14', 'dateIn15', 'dateIn16', 'dateIn17', 'dateIn18', 'dateIn19', 'dateIn20', 'dateIn21', 'dateIn22', 'dateIn23', 'dateIn24', 'dateIn25', 'dateIn26', 'dateIn27', 'dateIn28', 'dateIn29', 'dateIn30', 'dateIn31'];
    const getName = await axios.get('../php/LoadUser.php'); // 현재 로그인 중인 사용자의 ID를 받아오기 위한 코드
    let userName = getName.data.username; // 현재 로그인 중인 사용자의 ID

    if(nowMonth+1 == 0) nowMonth = 11;  // 12월을 0월로 인식하는거 방지
    const monthDay2 = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth+1}); // 현재 월에 해당되는 날짜들을 배열로 받아옴

    // 모든 미션들 숨겨줌
    for (let i = 1; i <= monthDay2.data.length; i++) {
        let mission = document.querySelector(`.missions${i}`);
        mission.style.display='none';
    }

    // 클릭한 날짜에 해당하는 미션만 보여줌
    for (let i = 0; i < monthDay2.data.length; i++) {
        if(event.target.classList.contains(dateInArr[i])) {
          const mission = document.querySelector(`.missions${i+1}`);
          mission.style.display='';          
        }
    }
};

// 날짜 변환 함수 (년, 월, 일을 반환) 
const getDate = (date) => { 
  return date.toLocaleDateString().replace(/\./g, "").split(" "); 
};

// pad 함수 ( 10 이하는 앞에 0붙이기 )
const pad = (str) => str > 9 ? str : '0' + str;  

// 시작시 페이지에 로딩되는 함수 - thisMonth() 오버라이딩
window.onload = async function() {  
  SessionCheck();
  const getName = await axios.get('../php/LoadUser.php'); // 현재 로그인 중인 사용자의 ID를 받아오기 위한 코드
  let userName = getName.data.username; // 현재 로그인 중인 사용자의 ID
  let name = getName.data.name; // 현재 로그인 중인 사용자의 이름

  const [y, m] = getDate(new Date(ToDay.setMonth(nowMonth)));  // y : year, m : month

  const lastDay = getDate(new Date(y, m, 0)).pop() * 1; // 해당하는 달의 제일 마지막 날짜
  const day = new Date([y, m, 1].join("-")).getDay() * 1; // 해당하는 덜의 첫 요일
  const maxDay = Math.ceil((day + lastDay) / 7) * 7; // 해당하는 달에서 필요한 달력 칸의 개수

  arr(nowMonth, userName);  // 미션 load

  CheckedCnt(nowMonth, userName); // check 개수

  let html = '';
  let dcnt = 0;

  // 요일과 마지막 일을 합친 수만큼 반복문
  for (let i = 1; i <= maxDay; i++) {
    const diff = i - day; // dateSel 개수 (11월 기준 0-34까지 35칸)
    const d = diff <= lastDay && i > day ? diff : ''; // date가 유효한 날만 d로 뽑아냄
    if(d) dcnt++; // d가 존재한다면 dcnt 값 증가
    const tmpClass = !d ? 'background' : `dateIn${d}`; // 유효한 날이 아닌 경우 background를, 유효한 날인 경우는 dateIn${i}를 tmpClass 변수에 넣어줌

    html += `<div class="oneDateSel ${tmpClass}">${d}</div>`;
  }
  document.querySelector('.dateSel').innerHTML = html;
  document.querySelector('.date_text').innerText = `${name}님의 ${y}년 ${pad(m)}월,`;
  
  for (let i = 1; i <= dcnt; i++) { // 해당하는 달의 일 개수만큼 handleClick이벤트 넣어줌
    document.querySelector(`.dateIn${i}`).addEventListener("click", handleClick);
  }
  dcnt = 0; // d cnt 초기화
}

const writeCal = async(nowMonth) => { 
  const getName = await axios.get('../php/LoadUser.php'); // 현재 로그인 중인 사용자의 ID를 받아오기 위한 코드
  let userName = getName.data.username; // 현재 로그인 중인 사용자의 ID
  let name = getName.data.name; // 현재 로그인 중인 사용자의 이름

  const [y, m] = getDate(new Date(ToDay.setMonth(nowMonth)));  // y : year, m : month

  const lastDay = getDate(new Date(y, m, 0)).pop() * 1; // 해당하는 달의 제일 마지막 날짜
  const day = new Date([y, m, 1].join("-")).getDay() * 1; // 해당하는 덜의 첫 요일
  const maxDay = Math.ceil((day + lastDay) / 7) * 7; // 해당하는 달에서 필요한 달력 칸의 개수

  arr(nowMonth, userName);  // 미션 load

  CheckedCnt(nowMonth, userName); // check 개수

  let html = '';
  let dcnt = 0;

  // 요일과 마지막 일을 합친 수만큼 반복문
  for (let i = 1; i <= maxDay; i++) {
    const diff = i - day; // dateSel 개수 (11월 기준 0-34까지 35칸)
    const d = diff <= lastDay && i > day ? diff : ''; // date가 유효한 날만 d로 뽑아냄
    if(d) dcnt++; // d가 존재한다면 dcnt 값 증가
    const tmpClass = !d ? 'background' : `dateIn${d}`; // 유효한 날이 아닌 경우 background를, 유효한 날인 경우는 dateIn${i}를 tmpClass 변수에 넣어줌

    html += `<div class="oneDateSel ${tmpClass}">${d}</div>`;
  }
  document.querySelector('.dateSel').innerHTML = html;
  document.querySelector('.date_text').innerText = `${name}님의 ${y}년 ${pad(m)}월,`;
  
  for (let i = 1; i <= dcnt; i++) { // 해당하는 달의 일 개수만큼 handleClick이벤트 넣어줌
    document.querySelector(`.dateIn${i}`).addEventListener("click", handleClick);
  }
  dcnt = 0; // d cnt 초기화
};

 // 전 달, 다음 달 보여주는 함수
const calendar = (month) => { 
  nowMonth = month;
  writeCal(nowMonth);
};

// 이번 달을 보여주는 함수
const thisMonth = () => {  
  ToDay = new Date();
  nowMonth = ToDay.getMonth();
  writeCal(nowMonth);
};

// 완료한 미션 개수
const CheckedCnt = async(nowMonth, userName) => {
  const checkTrue = await axios.post('../php/getCheck.php', {nowMonth: nowMonth+1, userName: userName});
  const checkcnt = checkTrue.data.length;

  if(checkcnt > 0) document.querySelector('.checkNum').innerText = `${checkcnt}개의 미션을 완료했습니다!`;
  else document.querySelector('.checkNum').innerText = `0개의 미션을 완료했습니다!`;
};

// checkbox check될 때 개수 바뀜
const getCheckedNum = (i, nowMonth) => {

  const checking = `input[name="${nowMonth}"]:checked`;   // 선택된 checkbox의 가져오기

  changeCB(i, nowMonth);  // DB에 체크 유무 표시 (0 -> 1)
  
  changeScore(); // score 증가

  const selectCheck = document.querySelectorAll(checking);
  
  const selectCheckAll = selectCheck.length;  // 선택된 checkbox의 개수 세기
  
  document.querySelector('.checkNum').innerText = `${selectCheckAll}개의 미션을 완료했습니다!`; // check 미션 개수 바로 바뀜

};

// 값이 1로 하나씩 바뀔 때마다 스코어가 1씩 증가! 
const changeScore = async(userName) => {
  try {
    const getName = await axios.get('../php/LoadUser.php');
    let userName = getName.data.username;
    let response = await axios.post('../php/changeScore.php', {userName: userName});
  
    if(response.data) {
      // console.log("점수가 증가하였습니다.");
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
    const getName = await axios.get('../php/LoadUser.php');
    let userName = getName.data.username;
    const response = await axios.post('../php/changeCheck.php', {nowMonth: nowMonth, nowDay: nowDay, userName: userName});

    if(response.data) {
      // console.log(`${nowMonth}월 ${nowDay}일의 미션 완료`);
    } else {
        alert("실패!");
    }
  } catch(error) {
  console.log(error); 
  } 
};