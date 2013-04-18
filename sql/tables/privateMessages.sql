CREATE TABLE `privateMessages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `conversation` int(20) NOT NULL,
  `author` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `ip` varchar(20) NOT NULL,
  `previousMessage` int(20) NOT NULL,
  `nextMessage` int(20) NOT NULL,
  `messageContent` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
