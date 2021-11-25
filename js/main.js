let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

window.onload = async function() {  
  SessionCheck();

  const getName = await axios.get('../php/LoadUser.php');
  const getRank = await fetch('../php/LoadUser.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
  const getRankData = await getRank.json();
  let name = getName.data.name;
  let score = getName.data.score;
  let rank = getRankData['rank'];

  document.getElementById("name").innerText = `${name}`;
  document.getElementById("score").innerText = `${score}`;
  document.getElementById("rank").innerText = `${rank}`;

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

}
