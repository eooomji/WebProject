var mission_length, mission_cleared, score_now, score_pre, score_change, score_rank;
var rank;

score_now=(mission_cleared/score_length)*100;

score_change = score_now / score_before + score_now % score_before;
score_rank = mission_cleared/score_length;

if (score_rank>0.8) rank = "A";
else if (0.8>=score_rank>0.6) rank = "B";
else if (0.6>=score_rank>0.4) rank = "C";
else if (0.4>=score_rank>0.2) rank = "F";
else rank = "D";