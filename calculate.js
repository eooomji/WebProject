var score_daily, score_month;
var mission_daily_cleared, mission_daily_total;
var score_daily_pre, score_daily_change;
var days_in_month;
var rank;

score_daily=(mission_daily_cleared/mission_daily_total)*100;
score_daily_change=((score_daily/score_daily_pre)*100)-100;

for (var i = 0; i < days_in_month; i++) {
    month_score=month_score+(score_daily[i]/days_in_month);
}

month_score=month_score*100;

if (month_score/100>0.8) rank = "A";
else if (month_score/100>0.6) rank = "B";
else if (month_score/100>0.4) rank = "C";
else if (month_score/100>0.2) rank = "F";
else rank = "D";
