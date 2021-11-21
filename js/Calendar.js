let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

// DB에서 미션 다 불러오기
const arr = async(nowMonth) => {
  try {
    let missionHTML = '';
    const response = await axios.post('../php/getMissionByMonth.php', {nowMonth: nowMonth + 1});
    // let done = await axios.get('../php/getCheck.php');

    if(response.data) {
      console.log(response.data);
      for (let i = 0; i < 31; i++) {
        if(response.data[i] === undefined) response.data[i] = {content : ""};
        else missionHTML += `<div class="missions${i+1}"><input class="form-check-input${i+1}" type="checkbox" name="${nowMonth + 1}" onclick='getCheckedCnt(${i+1}, ${nowMonth + 1})'>${response.data[i].content}</div>`;
      }
    } 
    else {
      alert("실패!");
    }
      
    document.querySelector('.missionName').innerHTML = missionHTML;
    for (let i = 1; i <= 30; i++) {
        let mission = document.querySelector(`.missions${i}`);
        mission.style.display='none';
    }
  } catch(error) {
  console.log(error); 
  } 
};

// 클릭하면 해당 일에 해당되는 미션 보여주는 함수
const handleClick = (event) => {
    const dateInArr = ['dateIn1', 'dateIn2', 'dateIn3', 'dateIn4', 'dateIn5', 'dateIn6', 'dateIn7', 'dateIn8', 'dateIn9', 'dateIn10', 'dateIn11', 'dateIn12', 'dateIn13', 'dateIn14', 'dateIn15', 'dateIn16', 'dateIn17', 'dateIn18', 'dateIn19', 'dateIn20', 'dateIn21', 'dateIn22', 'dateIn23', 'dateIn24', 'dateIn25', 'dateIn26', 'dateIn27', 'dateIn28', 'dateIn29', 'dateIn30', 'dateIn31'];

    for (let i = 1; i <= 31; i++) {
        let mission = document.querySelector(`.missions${i}`);
        mission.style.display='none';
    }
    
    for (let i = 0; i <= 30; i++) {
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
window.onload = function() {  
  
  const nowMonth = ToDay.getMonth(); // 현재 Month
  arr(nowMonth);

  const [y, m] = getDate(new Date(ToDay.setMonth(nowMonth))); 

  const lastDay = getDate(new Date(y, m, 0)).pop() * 1; 
  const day = new Date([y, m, 1].join("-")).getDay() * 1;
  const maxDay = Math.ceil((day + lastDay) / 7) * 7; 

  let html = '';

  // 요일과 마지막 일을 합친 수만큼 반복문
  for (let i = 1; i <= maxDay; i++) {
    const diff = i - day; // dateSel 개수 (11월 기준 0-34까지 35칸)

    const d = diff <= lastDay && i > day ? diff : ''; // date가 유효한 날만 d로 뽑아냄
    
    const tmpClass = !d ? 'background' : `dateIn${d}`; 

    html += `<div class="oneDateSel ${tmpClass}">${d}</div>`;
  }
  document.querySelector('.dateSel').innerHTML = html;
  document.querySelector('.date_text').innerText = `엄지님의 ${y}년 ${pad(m)}월,`;
  
  for (let i = 1; i <= maxDay; i++) {
    document.querySelector(`.dateIn${i}`).addEventListener("click", handleClick);
  }
}

const writeCal = (nowMonth) => { 
  arr(nowMonth);
    
  const [y, m] = getDate(new Date(ToDay.setMonth(nowMonth))); 

  const lastDay = getDate(new Date(y, m, 0)).pop() * 1; 
  
  const day = new Date([y, m, 1].join("-")).getDay() * 1; 
  const maxDay = Math.ceil((day + lastDay) / 7) * 7; 

  let html = '';

  // 요일과 마지막 일을 합친 수만큼 반복문
  for (let i = 1; i <= maxDay; i++) {
    const diff = i - day;
    const d = diff <= lastDay && i > day ? diff : '';
    const tmpClass = !d ? 'background' : `dateIn${d}`;

    html += `<div class="dateSel ${tmpClass}">${d}</div>`;
  }

  document.querySelector('.dateSel').innerHTML = html;
  document.querySelector('.date_text').innerText = `엄지님의 ${y}년 ${pad(m)}월,`;

  for (let i = 1; i <= maxDay; i++) {
    document.querySelector(`.dateIn${i}`).addEventListener("click", handleClick);
  }
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

const getCheckedCnt = (i, nowMonth) => {
  // 선택된 목록 가져오기
  const query = `input[name="${nowMonth}"]:checked`;

  changeCB(i);  // DB에 체크 유무 표시 (0 -> 1)
  
  const selectedElements = document.querySelectorAll(query);
  
  // 선택된 목록의 개수 세기
  const selectedElementsCnt = selectedElements.length;
  
  // document.querySelector(query).innerHTML = `<input class="form-check-input${i+1}" type="checkbox" name="${nowMonth + 1}" onclick='getCheckedCnt(${nowMonth + 1})' checked/>`;
  // 출력
  // console.log(selectedElementsCnt);
  document.querySelector('.checkNum').innerText = `${selectedElementsCnt}개의 미션을 완료했습니다!`;


};

// DB isDone 값 0 -> 1로 변경
const changeCB = async(i) => {
  try {
    const msdate = i;
    const response = await axios.post('../php/changeCheck.php', {msdate: msdate});

    if(response.data) {
      // console.log(response.data);
    } else {
        alert("실패!");
    }
  } catch(error) {
  console.log(error); 
  } 
};