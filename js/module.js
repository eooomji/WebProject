// js ���Ͽ� �߰� import { SessionCheck } from 'module.js';
// html���� <script type="module">...</script> �� ����

/*/ ���⼭ axios ����� �ȵǳ׿�
const SessionCheck = async () => {
	try {
		const response = await axios.get("../php/sessionCheck.php");
		if (response.data) { // ���ǿ� �α��������� ���� ���
			;
		} else {  // ���ǿ� �α��������� ���� ���
			location.replace("../html/login.html");
		}
	} catch (error) {
		console.log(error);
	}
};
/*/

const SessionCheck = () => {
	fetch('../php/sessionCheck.php', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(Response => {
		return Response.json();
	}).then(Result => {
		if (Result) {
		} else {
			location.replace("../html/login.html");
		}
	}).catch(error => {
		console.log(error);
	});
}
export { SessionCheck };