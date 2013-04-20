CREATE DATABASE [IF NOT EXISTS] social;
USE social;



-- Create USERS table
CREATE  TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL ,
  `firstName` TEXT NULL ,
  `lastName` TEXT NULL ,
  `userName` TEXT NULL ,
  `email` TEXT NULL ,
  `password` TEXT NULL ,
  `birthDate` DATETIME NULL ,
  `joinDate` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB




