CREATE TABLE `galleries` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `author` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `ip` varchar(20) NOT NULL,
  `firstPicture` int(20) NOT NULL,
  `lastPicture` int(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `legend` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
