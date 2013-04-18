CREATE TABLE `likes` (
  `author` int(20) NOT NULL,
  `ParentType` int(20) NOT NULL,	-- (0: WallMessage, 1: Photo, 2: Gallery, 3: Comment)
  `ParentId` int(20) NOT NULL,
  PRIMARY KEY (`author`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
