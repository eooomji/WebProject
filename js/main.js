let ToDay = new Date(); 

window.onload = async function() {  
  SessionCheck();
  const getName = await axios.get('../php/LoadUser.php');
  let name = getName.data.name;
  let score = getName.data.score;

  document.querySelector('.highlight-b').innerText = `${name}`;
  document.querySelector('.highlight-a').innerText = `${score}`;

  const mission = document.querySelector(`.missions${Date+1}`);
  mission.style.display=''; 
}
