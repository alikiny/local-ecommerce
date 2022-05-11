# Fullstack-Typescript-Project

First choose the project topic. The topics are from REST API lecture.

## Prerequisites

1. Install mongodb
2. Install nodejs

## Setting Up

1. Create a `.env` file in the root directory and copy the content from `.env.example`

2. Make sure mongodb is running
3. Install dependencies: `yarn`
4. Use this command for development mode: `yarn run start:dev`
5. If you need to customize your env, take a look at `secrets.ts` file

## Requirements

Below are the steps that you need to finish in order to finish this module

1. Explore the code base of the api folder, start with `server.ts` and `app.ts`
2. Client folder is for the react frontend. Start with `api` first before moving on to `client`
3. Create all the mongoose schema for your ERD
4. Create CRUD endpoints for all the schema
5. Separate the routers and controller, controller goes into the controller folders. Controllers only handles request and response, and will call service to process business logics.
6. Create more controller for your app if needed. Eg: borrow books, add product to order
7. For business logic like saving data to database, filtering, searching or updating, these are services and goes into services folder
8. Add authentication middleware using passport, google and jwt strategy
9. Add tests for your controllers and services. Remember to create the jwt token for your tests, because if your controller is protected, then the test should send the token also

## Instruction and Documentation to run fs9-fullstack project locally
1. Clone the repo. It contatins folder api, client, docker.compose.yml, .github/workflows (for CI/DC action) and README.md
2. Install node_module by runing commnad in api and client folder
```script
npm install 
```
2. create .env file in root file of client folder and paste
```script
REACT_APP_BACKEND=http://localhost:5000/api/v1
```
3. create .env file in root file of api folder and paste. this will allow to connect mongodb and some of secret veriable. To get connected with mongodb run locally you mongodb
Here you can find instruction to install and run mongodb locally
[Mongodb install and run instruction](https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows) 
```script
# Get this from mongodb atlas after you've logged in and created a database
MONGODB_URI_LOCAL=mongodb://localhost:27017/give_some_name_for_db

# Put lots of randomness in these
JWT_SECRET=ashdfjhasdlkjfhalksdjhflak
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Application Port - express server listens on this port (default 3000).
PORT = 5000
GOOGLE_CLIENT_ID=(create your own google client variable by visiting to google cloud platform)
```

4. Run cmd in terminal in client folder
```script
npm start
```
5. Run cmd in terminal in api folder
```script
npm run start:dev
```
### Project live link
[DEMO](https://timely-heliotrope-fb7540.netlify.app/)

## Home page image
![Home Page](picture/Nike-Sneaker.png?raw=true "Title")