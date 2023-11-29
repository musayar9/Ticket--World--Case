# Welcome To Ticket World - [Live Demo](https://ticket-verse.azurewebsites.net/)

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E=18%20%3C21-brightgreen)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-%5E4.18.2-blue)](https://expressjs.com/)
[![MongoDB Version](https://img.shields.io/badge/MongoDB-%5E6.2.0-green)](https://www.mongodb.com/)
[![Mongoose Version](https://img.shields.io/badge/Mongoose-%5E8.0.0-orange)](https://mongoosejs.com/)
[![Nodemon Version](https://img.shields.io/badge/Nodemon-%5E3.0.1-red)](https://nodemon.io/)
[![Babel Version](https://img.shields.io/badge/Babel-%5E7.23.2-yellow)](https://babeljs.io/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Dotenv Version](https://img.shields.io/badge/Dotenv-%5E16.3.1-yellow)](https://www.npmjs.com/package/dotenv)
[![Cors Version](https://img.shields.io/badge/Cors-%5E2.8.5-brightgreen)](https://www.npmjs.com/package/cors)

## Ticket World Introduction

Welcome to Ticket World, an innovative platform that allows you to manage and discover a variety of exciting events, cities and user experiences.

In this project, we created our own APIs using the express.js library to create and manage server-side web applications in the Node.js environment. Activity, city and user data are kept in these APIs. We used the MongoDb database to store and manage this APIs. We used the Mongoose library to manage database interactions for MongoDb and NodeJs.
We used Dotenv to load environment variables from an .env file.
Ensuring secure communication between frontend and backend, and
We used Cors policies to control resource sharing between web browsers

### Technologies Used

_`Node.js (v18.x):`_ The server-side JavaScript runtime for building scalable and high-performance applications.

_`Express.js (v4.18.2):`_ A minimal and flexible Node.js web application framework that facilitates the development of robust APIs.

_`MongoDB (v6.2.0):`_ A NoSQL database used for storing and managing data related to activities, cities, and users.

_`Mongoose (v8.0.0):`_ An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution for managing database interactions.

_`Nodemon (v3.0.1):`_ A utility that monitors for changes in the application and automatically restarts the server during development.

_`Babel (v7.23.2):`_ A JavaScript compiler that enables the use of modern ECMAScript features in Node.js.

_`Dotenv (v16.3.1):`_ A zero-dependency module for loading environment variables from a .env file.

_`Cors (v2.8.5):`_ Middleware for handling Cross-Origin Resource Sharing to ensure secure communication between the frontend and backend.

## Defined Routes

## Activity Crud

| Route             | HTTP Verb | POST body                                     | Description            |
| ----------------- | --------- | --------------------------------------------- | ---------------------- |
| /api/activity     | GET       | Empty                                         | List all activity.     |
| /api/activity     | POST      | [Activity JSON](#activity-json)               | Create a new activity. |
| /api/activity/:id | GET       | Empty                                         | Get a activity.        |
| /api/activity/:id | PUT       | [Update Activity JSON](#update-activity-json) | Update a activity.     |
| /api/activity/:id | DELETE    | Empty                                         | Delete a activity.     |

## City Crud

| Route         | HTTP Verb | POST body                             | Description        |
| ------------- | --------- | ------------------------------------- | ------------------ |
| /api/city     | GET       | Empty                                 | List all city.     |
| /api/city     | POST      | [City JSON](#city-json)               | Create a new city. |
| /api/city/:id | GET       | Empty                                 | Get a city.        |
| /api/city/:id | PUT       | [Update City JSON](#update-city-json) | Update a city.     |
| /api/city/:id | DELETE    | Empty                                 | Delete a city.     |

## User Crud

| Route          | HTTP Verb | POST body                             | Description        |
| -------------- | --------- | ------------------------------------- | ------------------ |
| /api/users     | GET       | Empty                                 | List all users.    |
| /api/users     | POST      | [User JSON](#user-json)               | Create a new user. |
| /api/users/:id | PUT       | [Update User JSON](#update-user-json) | Update a user.     |
| /api/users/:id | DELETE    | Empty                                 | Delete a user.     |

### JSON Examples:

#### Activity JSON

```json
{
  "title": "İzmir Gastrofest",
  "city": "İzmir",
  "description": "İZMİR GASTROFEST 12 KASIM PAZAR...",
  "category": "festivals",
  "image": [
    {
      "photo": "https://cdn.bubilet.com.tr/files/Etkinlik/izmir-gastrofest-80683.png"
    }
  ],
  "location": "Alsancak, Umurbey Mahallesi, 35000",
  "locationName": "Alsancak Tarihi Hava Gazı Fabrikası",
  "ticketPrice": "300",
  "hour": "09:00",
  "date": "2023-11-12",
  "locationMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125..."
}
```

#### Update Activity JSON

```json
{
  "title": "Zakkum İstanbul Konseri",
  "city": "İstanbul",
  "category": "theatre"
}
```

#### City JSON

```json
{
  "plate": "58",
  "name": "Sivas"
}
```

#### Update City JSON

```json
{
  "plate": "34",
  "name": "İstanbul"
}
```

#### User JSON

```json
{
  "email": "admin@admin.com",
  "firstName": "Admin",
  "lastName": "Admin",
  "password": "123456",
  "terms": true,
  "favorites": [],
  "cart": [],
  "tickets": [],
  "avatar": ""
}
```

#### Update User JSON

```json
{
  "favorites": [],
  "cart": [],
  "tickets": [],
  "avatar": ""
}
```
