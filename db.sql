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

CREATE TABLE `mission_log` (
  `username` VARCHAR(45) NOT NULL,
  `missionName` VARCHAR(255),
  `isDone` TINYINT NOT NULL,
  `date` DATE NOT NULL,
  FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE,
  FOREIGN KEY (missionName) REFERENCES missions(missionName) ON DELETE SET NULL
);

CREATE TABLE `login_log` (
  `username` VARCHAR(45) NOT NULL,
  `loginLog` DATETIME NOT NULL,
  `inout` TINYINT NOT NULL,
  FOREIGN KEY (username) REFERENCES `user`(username) ON DELETE CASCADE
);
