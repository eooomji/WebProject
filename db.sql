CREATE TABLE `user` (
  `username` VARCHAR(45) NOT NULL PRIMARY KEY,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `choice` TINYINT NOT NULL,
  `score` INT NOT NULL
);

CREATE TABLE `missions` (
  `missionName` VARCHAR(255) NOT NULL PRIMARY KEY,
  `category` TINYINT NOT NULL
);

CREATE TABLE `misson_log` (
  `username` VARCHAR(45) NOT NULL,
  `missionName` VARCHAR(255),
  `isDone` TINYINT NOT NULL,
  `date` DATE NOT NULL,
  FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE,
  FOREIGN KEY (missionName) REFERENCES missions(missionName) ON DELETE SET NULL
);

CREATE TABLE `login_log` (
  `username` VARCHAR(45) NOT NULL,
  `loginLog` DATETIME2 NOT NULL,
  FOREIGN KEY (username) REFERENCES `user`(username) ON DELETE CASCADE
);

INSERT INTO `missions`
(`missionName`, `category`)
VALUES
('오늘 하루 걸음 수 10000 걸음 채우기', 1),
('팔굽혀펴기 50개 하기', 1),
('3km 이상 뛰기', 1),
('5km 이상 걷기', 1),
('오늘 아침 식사 챙겨먹기', 2),
('오늘 낭비하는 시간 1시간 줄이기', 2),
('오늘은 아침 7시에 일어나기', 2),
('만원 저축하기', 2),
('가족들한테 맛있는거 사주기', 4),
('평소 고마웠던 사람에게 커피 한 잔 사주기', 4),
('오늘 하루 욕 안하기', 4),
('오늘 하루 최소 3명에서 칭찬 해주기', 4),
('오늘 하루 최소 3명에게 웃으며 먼저 인사하기', 4),
('영어 단어 10개 외우기', 8),
('수학 문제 5개 풀기', 8),
('오늘 하루 책 20장 읽기', 8),
('11월 21일 카테고리 1번 미션', 1),
('11월 22일 카테고리 1번 미션', 1),
('11월 23일 카테고리 1번 미션', 1),
('11월 24일 카테고리 1번 미션', 1),
('11월 25일 카테고리 1번 미션', 1),
('11월 26일 카테고리 1번 미션', 1),
('11월 27일 카테고리 1번 미션', 1),
('11월 28일 카테고리 1번 미션', 1),
('11월 29일 카테고리 1번 미션', 1),
('11월 30일 카테고리 1번 미션', 1);

INSERT INTO `user`
(`username`, `password`, `name`, `email`, `choice`, `score`)
VALUES
('user1', 'user1', '손엄지', 'sej@naver.com', '1', '0'),
('user2', 'user2', '김명진', 'kmj@naver.com', '2', '0'),
('user3', 'user3', '주영준', 'jyj@naver.com', '4', '0'),
('user4', 'user4', '최승호', 'csh@naver.com', '8', '0');

INSERT INTO `misson_log`
(`username`, `missionName`, `check`, `date`)
VALUES
('user1', '11월 21일 카테고리 1번 미션', '0', '2021-11-21'),
('user2', '오늘은 아침 7시에 일어나기', '0', '2021-11-21'),
('user3', '가족들한테 맛있는거 사주기', '0', '2021-11-21'),
('user1', '11월 22일 카테고리 1번 미션', '0', '2021-11-22'),
('user1', '11월 23일 카테고리 1번 미션', '0', '2021-11-23'),
('user1', '11월 24일 카테고리 1번 미션', '0', '2021-11-24'),
('user1', '11월 25일 카테고리 1번 미션', '0', '2021-11-25'),
('user1', '11월 26일 카테고리 1번 미션', '0', '2021-11-26'),
('user1', '11월 27일 카테고리 1번 미션', '0', '2021-11-27'),
('user1', '11월 28일 카테고리 1번 미션', '0', '2021-11-28'),
('user1', '11월 29일 카테고리 1번 미션', '0', '2021-11-29'),
('user1', '11월 30일 카테고리 1번 미션', '0', '2021-11-30');
