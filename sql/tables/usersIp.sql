CREATE TABLE `usersIp` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL,
  `user` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;