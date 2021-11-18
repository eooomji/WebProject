onload = () => {
	AddRow();
}

const AddRow = () => {
	fetch('../php/Rank.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return Response.statusText === "OK" ? Response.json() : alert(Response.statusText);
	}).then((Result) => {
		const RankTable = document.getElementById("ranktable");
		Result["data"].forEach((element) => {
			const row = RankTable.insertRow(-1);
			row.insertCell(-1).innerText = Result["StartRank"]++;
			element.forEach((CellData) => {
				row.insertCell(-1).innerText = CellData;
			});
		});
	});
}

