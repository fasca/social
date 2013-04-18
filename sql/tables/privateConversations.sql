CREATE TABLE `privateConversations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `firstMessage` int(20) NOT NULL,
  `lastMessage` int(20) NOT NULL,
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


