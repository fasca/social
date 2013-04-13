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
- ConversationsArrayId (JSON String with all the IDs of Conversations the User is involved)
- WallMessagesArrayId (JSON String with all the IDs of Wall Messages the User has received)


#### WallMessages
- Id
- From (Link to Users.Id)
- To (Link to Users.Id)
- DateTime
- MessageContent
- Likes Array (JSON String with all Users ID)


Conversations
-------------

#### PrivateConversations
- Id 
- CreationDate
- FirstMessage
- LastMessage
- UsersArrayId (JSON String with all the IDs of the Users involved in the conversation)


#### PrivateMessages
- Id
- Conversation
- Author
- Date & Time
- PreviousMessage
- NextMessage
- MessageContent


Photos
------

#### Galleries
- Id
- Author
- Date & Time
- FirstPicture
- LastPicture
- Name
- Legend
- Pictures Array (JSON String with all Pictures IDs)
- Likes Array (JSON String with all Users ID)


#### Pictures
- Id
- Gallery
- Author
- PreviousPicture
- NextPicture
- Date & Time
- Legend
- Likes Array (JSON String with all Users ID)


#### ! Comments 
- Id
- Author
- ParentObject
- ParentType
- Comment
- Likes Array (JSON String with all Users ID)



#### ! Think to a Garbage Collector (Non-linked resources to delete)
#### ! IP adresses & Geolocation
Conversations
------------