 aTables Structures
=================


#### Users Table
- Id
- FirstName
- LastName
- Nickname
- Email
- Password
- BirthDate
- JoinDate
- ConversationsArrayId (JSON String with all the IDs of Conversations the User is involved)
- WallMessagesArrayId (JSON String with all the IDs of Wall Messages the User has received)


#### WallMessages Table
- Id
- SenderId (Link to Users.Id)
- ToId (Link to Users.Id)
- DateTime
- MessageContent


#### PrivateConversations Table
- Id 
- CreationDate
- UsersArrayId (JSON String with all the IDs of the Users involved in the conversation)
- Messages Array (JSON String with all the IDs of Messages )


#### PrivateMessages Table
- Id
- Conversation Id
- Author
- Date & Time
- MessageContent


#### Galleries
- Id
- Author
- Date & Time
- Name
- Legend
- Pictures Array (JSON String with all Pictures IDs)


#### Pictures
- Id
- Gallery Id
- Author
- Date & Time
- Legend




#### ! Think to a Garbage Collector (Non-linked resources to delete)