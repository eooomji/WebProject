// js 파일에 추가 import { SessionCheck } from 'module.js';
// html에서 <script type="module">...</script> 로 변경

/*/ 여기서 axios 사용이 안되네요
const SessionCheck = async () => {
	try {
		const response = await axios.get("../php/sessionCheck.php");
		if (response.data) { // 세션에 로그인정보가 있을 경우
			;
		} else {  // 세션에 로그인정보가 없을 경우
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