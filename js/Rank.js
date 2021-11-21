
const CheckHttpResponseStatus = (res => {
	if (res.statusText === "OK") {
		return res.json();
	} else {
		throw `${res.status} ${res.statusText}`;
	}
})

onload = () => {
	LoadRank();
}

const LoadRank = () => {
	fetch('../php/LoadRank.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return CheckHttpResponseStatus(Response);
	}).then((Result) => {
		const RankTable = document.getElementById("ranktable");
		Result["data"].forEach((element) => {
			const row = RankTable.insertRow(-1);
			row.insertCell(-1).innerText = Result["StartRank"]++;
			element.forEach((CellData) => {
				row.insertCell(-1).innerText = CellData;
			});
		});
	}).catch(error => {
		alert(error);
	});
}

