
let RankCount = 1;

const AddRow = () => {
	fetch('http://127.0.0.1:8000/', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return Response.statusText === "OK" ? Response.json() : alert(Response.statusText);
	}).then((Result) => {
		
		var row = document.getElementById("ranktable").insertRow(-1);
		row.insertCell(-1).innerText = Result["StartRank"]++;
		row.insertCell(-1).innerText = '2';
		row.insertCell(-1).innerText = '3';
		row.insertCell(-1).innerText = '4';
	});
}

