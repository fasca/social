CREATE TABLE `wallMessages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `from` int(20) NOT NULL,
  `to` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `ip` varchar(20) NOT NULL,
  `MessageContent` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;