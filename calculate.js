const score_daily, score_month;
const mission_daily_cleared, mission_daily_total;
const score_daily_pre, score_daily_change;
const days_in_month;
const rank;

score_daily=(mission_daily_cleared/mission_daily_total)*100; //일간 점수 계산
score_daily_change=((score_daily/score_daily_pre)*100)-100; //main 에서 점수 변화를 반영하는 부분

for (var i = 0; i < days_in_month; i++) {
    month_score=month_score+(score_daily[i]/days_in_month);
}
month_score=month_score*100; //월간 점수 계산

if (month_score/100>0.8) rank = "A";
else if (month_score/100>0.6) rank = "B";
else if (month_score/100>0.4) rank = "C";
else if (month_score/100>0.2) rank = "F";
else rank = "D"; //db에서 월간 점수 반영
