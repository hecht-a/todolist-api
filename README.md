# TodoList API
This repository contains the API of my TodoList project.
The client side can be found [here](https://github.com/hecht-a/todolist-client).
---
## Get the code
```shell
git clone https://github.com/hecht-a/todolist-api
cd todolist-api
```

## Usage in development
### Using Yarn
```shell
yarn
node ace migration:run
yarn dev
```

### Using npm
```shell
npm install
node ace migration:run
npm run dev
```

## Usage in production
### Using yarn
```shell
yarn build
cp .env build/.env
cd build/
yarn
node ace migration:run
yarn start
```
---
## Routes
`GET /health`: Get health of the api
---
### Users routes
#### Request  
`POST /register`: register new user  
```text
curl -X POST http://localhost:3333/register -H "Content-Type: application/x-www-form-urlencoded" -d "email=email@gmail.com&password=password"
```
#### Response  
```json
{
    "email":"email@gmail.com",
    "created_at":"2021-09-12T14:16:43.570+02:00",
    "updated_at":"2021-09-12T14:16:43.570+02:00",
    "id":7
}
```
---
#### Request
`POST /login`: login to existing user  
```text
curl -X POST http://localhost:3333/login -H "Content-Type: application/x-www-form-urlencoded" -d "email=email@gmail.com&password=password"
```
#### Response
```json
{
  "token":"ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc",
  "id":7,
  "email":"email@gmail.com",
  "created_at":"2021-09-12T14:16:43.000+02:00",
  "updated_at":"2021-09-12T14:16:43.000+02:00"
}
```
---
#### Request
`GET /me`: get user's infos
```text
curl -X GET http://localhost:3333/me -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
{
  "id":7,
  "email":"email@gmail.com",
  "created_at":"2021-09-12T14:16:43.000+02:00",
  "updated_at":"2021-09-12T14:16:43.000+02:00"
}
```
---
### Category routes
#### Request
`POST /category`: create new category  
```text
curl -X POST http://localhost:3333/category -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc" -d "name=category&owner=7"
```
#### Response
```json
{
  "name":"category",
  "owner":7,
  "uuid":"34e49758-c193-40c8-beb7-812d91737c4f",
  "created_at":"2021-09-12T14:33:54.964+02:00",
  "updated_at":"2021-09-12T14:33:54.965+02:00",
  "id":113
}
```
---
#### Request
`GET /category/all`: Get all categories  
```text
curl -X GET http://localhost:3333/category/all -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
[
  {
    "id":113,
    "uuid":"34e49758-c193-40c8-beb7-812d91737c4f",
    "name":"category",
    "owner":7,
    "created_at":"2021-09-12T14:33:54.000+02:00",
    "updated_at":"2021-09-12T14:33:54.000+02:00"
  }
]
```
---
#### Request
`GET /category/:id`: Get category according to the parameter `id`   
```text
curl -X GET http://localhost:3333/category/113 -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
{
  "id":113,
  "uuid":"34e49758-c193-40c8-beb7-812d91737c4f",
  "name":"category",
  "owner":7,
  "created_at":"2021-09-12T14:33:54.000+02:00",
  "updated_at":"2021-09-12T14:33:54.000+02:00"
}
```
---
#### Request
`DELETE /category/:id`: Delete category according to the parameter `id`
```text
curl -X DELETE http://localhost:3333/category/113 -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
{
  "message":"Category with id: 113 has been deleted."
}
```
---

### Item routes
#### Request
`POST /item`: create new item  
```text
curl -X POST http://localhost:3333/item -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc" -d "name=task2&state=0&category=113&owner=7&start=2021-09-12 12:00&end=2021-09-12 14:00"
```
#### Response
```json
{
  "name":"task2",
  "state":false,
  "category":113,
  "owner":7,
  "start":"2021-09-12 12:00",
  "end":"2021-09-12 14:00",
  "created_at":"2021-09-12T22:13:08.581+02:00",
  "updated_at":"2021-09-12T22:13:08.581+02:00",
  "id":146
}
```
---
#### Request
`GET /item`: Get all items  
```text
curl -X GET http://localhost:3333/item -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
[
  {
    "id":146,
    "name":"task2",
    "state":0,
    "category":113,
    "owner":7,
    "description":null,
    "start":"2021-09-12T10:00:00.000Z",
    "end":"2021-09-12T12:00:00.000Z",
    "created_at":"2021-09-12T22:13:08.000+02:00",
    "updated_at":"2021-09-12T22:13:08.000+02:00"
  }
]
```
---
#### Request
`GET /item/:categoryId`: Get items in the category defined by `categoryId`   
```text
curl -X GET http://localhost:3333/item/113 -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
[
  {
    "id":146,
    "name":"task2",
    "state":0,
    "category":113,
    "owner":7,
    "description":null,
    "start":"2021-09-12T10:00:00.000Z",
    "end":"2021-09-12T12:00:00.000Z",
    "created_at":"2021-09-12T22:13:08.000+02:00",
    "updated_at":"2021-09-12T22:13:08.000+02:00"
  }
]
```
---
#### Request
`PUT /item/:id`: Update item according to the parameter `id`
```text
curl -X PUT http://localhost:3333/item/146 -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc" -d "description=a description for this task is set"
```
#### Response
```json
{
  "id":146,
  "name":"task2",
  "state":0,
  "category":113,
  "owner":7,
  "description":"a description for this task is set",
  "start":"2021-09-12T10:00:00.000Z",
  "end":"2021-09-12T12:00:00.000Z",
  "created_at":"2021-09-12T22:13:08.000+02:00",
  "updated_at":"2021-09-12T22:17:46.321+02:00"
}
```
---
#### Request
`DELETE /item/:id`: Delete item according to the parameter `id`
```text
curl -X DELETE http://localhost:3333/item/146 -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer ODg._vAicoUS_m7RSmPSJn59evc24yFyQ6kTyFJQ43y0G7m6IFW7PiMO0kP9eLJc"
```
#### Response
```json
{
  "message": "Item with id: 146 has been deleted."
}
```
---
