# 11.19
  
완성 : 달력 틀, 다른 달로 오가는 event , 날짜 있는 곳만 클릭, 각 날짜에 미션 추가  
남은 것 : 각 날짜에 미션 추가 => 클릭 이벤트로 구현하려고 함. 음..

Update   
= 해결 = 전 달, 다음 달 버튼 : 현재 Month 기준으로 -1, +1  => 사용자가 보고있는 Month.....를 정의해줘야하낭 으어어엉 이거 해결하쟈아으앙  
= 해결 = onclick을 일 별로 구분해주는 것도 필요함 : 지금은 onclick 이벤트가 모든 일에 동일하게 적용되고있더... ㅎ  
= 해결 = 미션 DB 생성 => 각 id에 맞는 미션을 할당해줄 것 (근데.. section 분리해서 보여줘야하니까 일단 미션 db가 4개여야겟군 이건 나중에 추가 예정)   
= 해결 = 각 날짜에 맞는 미션 보여주기 (hidden했다가 open되는 방식으로! display:none 쓰기?)  

해야할 것  
- 그 날 미션 완료(체크)시 DB isDone에 1로 바뀜 => checkbox를 checked로 바꿈  
- 새로고침해도 check 표시 남아있게 구현  
- 월, 일별 미션 할당
- 미션 section 4개로 나누기 => 사용자가 지정한 걸로 할당되게~ 해야해요~
- 체크정보를 스토리지에 저장하는거  
