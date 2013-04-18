CREATE TABLE `involvedConversations` (
  `conversation` int(20) NOT NULL,
  `user` int(20) NOT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;