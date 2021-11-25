let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

window.onload = async function() {  
  SessionCheck();
  const getName = await axios.get('../php/LoadUser.php');
  let name = getName.data.name;
  let score = getName.data.score;

  document.querySelector('.highlight-b').innerText = `${name}`;
  document.querySelector('.highlight-a').innerText = `${score}`;

  
  let massagecode = Math.floor(Math.random() * 3);
  switch(massagecode){
    case 0:
      document.getElementById("down").innerText = "오늘 하루도 힘내보아요!";
      break;
    case 1:
      document.getElementById("down").innerText = "천리길도 한걸음부터!";
      break;
    case 2:
      document.getElementById("down").innerText = "오늘도 열심히 해봅시다!";
      break;
  }
  
  let username = getName.data.username;
  const getMission = await axios.post('../php/getMissions.php', {userName: userName, nowMonth: nowMonth+1});
  const getMonth = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth+1});;

  document.querySelector('.mission').innerText = `${getMission.data[getMonth.data.length].missionName}`;
  
  if (getMission.data){
    document.getElementById("missioncheck").innerHTML = `<div class="oneDateSel missions${getMonth.data.length+1}"><input class="form-check-input" type="checkbox" name="${nowMonth+1}" onclick='getCheckedCnt(${getMonth.data.length+1}, ${nowMonth+1})'>${response.data[getMonth.data.length].missionName}</div>`;
  }
}

const getCheckedCnt = (i, nowMonth) => {
  // 선택된 목록 가져오기
  const query = `input[name="${nowMonth}"]:checked`;

  changeCB(i, nowMonth);  // DB에 체크 유무 표시 (0 -> 1)
  
  changeScore();

  const selectedElements = document.querySelectorAll(query);
  
  // 선택된 목록의 개수 세기
  const selectedElementsCnt = selectedElements.length;
  
  document.querySelector('.checkNum').innerText = `${selectedElementsCnt}개의 미션을 완료했습니다!`;

};

// 값이 1로 하나씩 바뀔 때마다 스코어가 1씩 증가! 
const changeScore = async(userName) => {
  try {
    const getName = await axios.get('../php/LoadUser.php');
    let userName = getName.data.username;
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
    const getName = await axios.get('../php/LoadUser.php');
    let userName = getName.data.username;
    const response = await axios.post('../php/changeCheck.php', {nowMonth: nowMonth, nowDay: nowDay, userName: userName});

    if(response.data) {
      console.log(`${nowMonth}월 ${nowDay}일의 미션 완료`);
    } else {
        alert("실패!");
    }
  } catch(error) {
  console.log(error); 
  } 
};
