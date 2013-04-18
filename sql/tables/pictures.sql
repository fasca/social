CREATE TABLE `pictures` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `gallery` int(20) NOT NULL,
  `author` int(20) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `previousPicture` int(20) NOT NULL,
  `nextPicture` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `legend` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
