Social Network
==============

A simple social network.

Installation
------------

Will need NodeJs to run.
Will use ExpressJs Framework (Server-Side)

Clone the repo :

~~~sh
git clone https://github.com/fasca/social
~~~

Run the server :
~~~sh
node app
~~~
The website will run at localhost:3000


Change :
~~~javascript
const useLocalConfig = true;
~~~
To use a local Database.
& Edit MySQL Server connection settings with sql/mysql-config-local.json and mysql-config.json


DONE
----

#### Database

- 14/04 : Created a MySQL database on Raspberry Pi
- 22/04 : We now have a Social API Folder.
- 23/04 : Set Up AJAX User Creation Form.
- 24/04 : Set Up a Basic Session Manager.


TO DO
-----

- SignIn Form is not Case-Sensitive
- Password Encryption (MD5)


#### Database

- Create Table for : Users
- Create Table for : Walls Entries
- Create Table for : Photo Galleries

#### Data

Where to store data like Images & Pics from Users ?
- Use MySQL Blob System

#### Create Basic Functions

- Create a User
- Login
- Close session
- Delete User
- Update User Info
- Add Image as Profile Picture
- Add Message on a Wall
- Delete Message on a Wall

#### Create User Interface

- How do we want to display Interface to User ?