// DB에서 미션 불러오기
const arr = async() => {
    try {
        let missionHTML = '';
        const response = await axios.post('../php/getMissionById.php');
        
        if(response.data) {
            for (let i = 0; i < 31; i++) {
                missionHTML += `<div class="missions${i+1}"><input type="checkbox" name="ms" value="msname"/>${response.data[i].content}</div>`;
            }
        } else {
            alert("실패!");
        }
        document.querySelector('.missionName').innerHTML = missionHTML;
        for (let i = 1; i <= 31; i++) {
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

let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

// pad 함수 ( 10 이하는 앞에 0붙이기 )
const pad = (str) => str > 9 ? str : '0' + str;  

// 시작시 페이지에 로딩되는 함수 - thisMonth() 오버라이딩
window.onload = function() {  
    arr();
  
  const nowMonth = ToDay.getMonth(); // 현재 Month

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

    html += `<div class="dateSel ${tmpClass}">${d}</div>`;
  }
  document.querySelector('.dateSel').innerHTML = html;
  document.querySelector('.date_text').innerText = `엄지님의 ${y}년 ${pad(m)}월,`;
  
  for (let i = 1; i <= maxDay; i++) {
    document.querySelector(`.dateIn${i}`).addEventListener("click", handleClick);
  }
}

const writeCal = () => { 
    arr();
    
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
  writeCal();
};

// 이번 달을 보여주는 함수
const thisMonth = () => {  
  ToDay = new Date();
  nowMonth = ToDay.getMonth();
  writeCal();
};
