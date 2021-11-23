let ToDay = new Date(); 
let nowMonth = ToDay.getMonth(); 

window.onload = async function() {  
  SessionCheck();
  const getName = await axios.get('../php/LoadUser.php');
  let name = getName.data.name;
  let score = getName.data.score;

  document.querySelector('.highlight-b').innerText = `${name}`;
  document.querySelector('.highlight-a').innerText = `${score}`;
  
  let username = getName.data.username;
  const getMission = await axios.post('../php/getMissions.php', {userName: userName, nowMonth: nowMonth+1});
  const getMonth = await axios.post('../php/getMissionDay.php', {userName: userName, nowMonth: nowMonth+1});;

  document.querySelector('.mission').innerText = `${getMission.data[getMonth.data.length].missionName}`;
}
