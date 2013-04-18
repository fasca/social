CREATE TABLE `comments` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `author` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `ip` varchar(20) NOT NULL,
  `ParentType` int(20) NOT NULL,	-- (0: WallMessage, 1: Photo, 2: Gallery, 3: Comment)
  `ParentId` int(20) NOT NULL,
  `Comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
