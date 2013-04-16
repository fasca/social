Tables Structures
=================


User & Profile
--------------

#### Users
- Id
- FirstName
- LastName
- UserName
- Email
- Password
- BirthDate
- JoinDate


#### UsersIP
- Id
- Ip
- User


#### WallMessages
- Id
- From (Link to Users.Id)
- To (Link to Users.Id)
- DateTime
- Ip
- MessageContent


Conversations
-------------

#### InvolvedConversations
- User
- Conversation


#### PrivateConversations
- Id
- CreationDate
- FirstMessage
- LastMessage


#### PrivateMessages
- Id
- Conversation
- Author
- DateTime
- Ip
- PreviousMessage
- NextMessage
- MessageContent


Photos
------

#### Galleries
- Id
- Author
- DateTime
- Ip
- FirstPicture
- LastPicture
- Name
- Legend


#### Pictures
- Id
- Gallery
- Author
- Ip
- PreviousPicture
- NextPicture
- Date & Time
- Legend


#### Comments :: Think about a way to do it.
#### Comments could be on a WallMessage, a Picture, or a Gallery.
- Id
- Author
- DateTime
- Ip
- ParentType (0: WallMessage, 1: Photo, 2: Gallery, 3: Comment)
- ParentId
- Comment


#### Likes :: Think about a way to do it.
#### Likes could be on a WallMessage, a Picture, a Gallery, or a comment.
- Author
- ParentType (0: WallMessage, 1: Photo, 2: Gallery, 3: Comment)
- ParentId


#### ! Geolocation