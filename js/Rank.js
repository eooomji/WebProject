
onload = () => {
	SessionCheck();
	LoadRank();
}

const LoadRank = async () => {
	try {
		const Response = await fetch('../php/LoadRank.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
		if (!Response.ok) {
			throw `${Response.status} ${Response.statusText}`;
		}
		const ResponseData = await Response.json();

		const RankTable = document.getElementById("ranktable");
		for (const element of ResponseData["data"]) {
			const row = RankTable.insertRow(-1);
			row.insertCell(-1).innerText = ResponseData["StartRank"]++;
			for (const CellData of element) {
				row.insertCell(-1).innerText = CellData;
			}
		}
	} catch (error) {
		alert(error);
	}
}

