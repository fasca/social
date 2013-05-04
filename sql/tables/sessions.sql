CREATE  TABLE `social`.`sessions` (
  `id` INT NOT NULL ,
  `userId` INT NULL ,
  `IP` TEXT NULL ,
  `passKey` TEXT NULL ,
  `lastTimestamp` TIMESTAMP NULL ,
  `userAgent` TEXT NULL ,
  PRIMARY KEY (`id`) );
