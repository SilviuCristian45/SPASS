# SPASS  API

## Project description and purpose

- SPASS is a password manager API
- SPASS was created with NodeJS, Express, and MongoDB
- SPASS offers authentication and CRUD operations for passwords 

## Setup locally 

- Install [NodeJS](https://nodejs.org/en/download/)
- Install express 
  ```JavaScript
  npm install express --save
  ```
- Install mongodb driver
  ```JavaScript
  npm install mongodb --save
  ```
- Make sure that you have installed [MongoDB](https://www.mongodb.com/try/download/community)
- Create a database named spass 
- Add 2 collections named users and passwords 
- Run the server file :) 
  ```JavaScript
  node server.js
  ```
## Queries: 
  - Login , POST  http://localhost:3000/users/login 
  - Register POST http://localhost:3000/users/register
  - Recommended body keys : username and password
  - If the user login succesfully, the response will be in the format JSON format with key token
  - If the user typed wrong the credentials, the response will contain the error key 
## Using the online version (Not supported yet)




