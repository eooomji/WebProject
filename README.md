# 11.21
  
완성 : 달력 틀, 다른 달로 오가는 event , 날짜 있는 곳만 클릭, 각 날짜에 미션 추가  
남은 것 : 각 날짜에 미션 추가 => 클릭 이벤트로 구현하려고 함. 음..

Update   
= 해결 = 전 달, 다음 달 버튼 : 현재 Month 기준으로 -1, +1  => 사용자가 보고있는 Month.....를 정의해줘야하낭 으어어엉 이거 해결하쟈아으앙  
= 해결 = onclick을 일 별로 구분해주는 것도 필요함 : 지금은 onclick 이벤트가 모든 일에 동일하게 적용되고있더... ㅎ  
= 해결 = 미션 DB 생성 => 각 id에 맞는 미션을 할당해줄 것 (근데.. section 분리해서 보여줘야하니까 일단 미션 db가 4개여야겟군 이건 나중에 추가 예정)   
= 해결 = 각 날짜에 맞는 미션 보여주기 (hidden했다가 open되는 방식으로! display:none 쓰기?)  

해야할 것  
- 새로고침해도 check 표시 남아있게 구현 (체크정보를 스토리지에 저장?) ??? 새로고침까지는 아니더라도 월이 바뀌면 체크된 것만큼의 개수로 바껴야하지 않겠니..
- 월, 일별 알맞은 미션 할당 ??? 31일   
- 미션 section 4개로 나누기 => 사용자가 지정한 걸로 할당되게~ 해야해요~  

문제점  
1. 체크 해제된 것 DB isDone이 0으로 안 바뀜  
2. 사용자 개개인의 미션 DB가 존재해야해... 만들고 연동하자 ^^  
3. 31일 있는 날들이 안 뜸 (handleClick에서 30번만 반복문을 돌렸기 때문에)    
4. 날짜 앞뒤로 체크를 하기 전까지 월 별 체크된 개수가 안 바뀜 (얘도 새로고침이랑 똑같은 문제일 것 같은데ㅠ)    
5. dateSel hover가 onload 일 때만 작동  
6. 달력 넘기기 가능한 월 : 7월-12월  
