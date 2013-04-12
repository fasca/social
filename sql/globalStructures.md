Tables Structures
=================


#### Users Table
- Id
- First Name
- Last Name
- Nickname
- Email
- Password
- Birth Date
- Join Date
-----------------
- Conversations Array (JSON String with all the IDs of Conversations the User is involved)
- WallMessages Array (JSON String with all the IDs of Wall Messages the User has received)


#### WallMessages Table
- Id
- Sender (Link to Users.Id)
- To (Link to Users.Id)
- Date & Time
- MessageContent


#### PrivateConversations Table
- Id 
- Creation Date
-----------------
- Users Array (JSON String with all the IDs of the Users involved in the conversation)
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
-----------------
- Pictures Array (JSON String with all Pictures IDs)


#### Pictures
- Id
- Gallery Id
- Author
- Date & Time
- Legend




#### ! Think to a Garbage Collector (Non-linked resources to delete)