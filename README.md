# Ticket World

![React](https://img.shields.io/badge/React-18.2.0-blue)
![React-DOM](https://img.shields.io/badge/React--DOM-18.2.0-red)
![Axios](https://img.shields.io/badge/Axios-1.6.0-yellow)
![React-Icons](https://img.shields.io/badge/React--Icons-4.11.0-green)
![React-Router-Dom](https://img.shields.io/badge/React--Router--Dom-6.18.0-orange)
![UUID](https://img.shields.io/badge/UUID-9.0.1-blueviolet)
![@emotion/react](https://img.shields.io/badge/@emotion/react-11.11.1-blue)
![@emotion/styled](https://img.shields.io/badge/@emotion/styled-11.11.0-pink)
![@mui/icons-material](https://img.shields.io/badge/@mui/icons--material-5.14.16-orange)
![@mui/material](https://img.shields.io/badge/@mui/material-5.14.17-purple)
![axios](https://img.shields.io/badge/axios-1.6.0-lightgrey)
![date-fns](https://img.shields.io/badge/date--fns-2.30.0-green)
![flowbite](https://img.shields.io/badge/flowbite-2.0.0-yellowgreen)
![formik](https://img.shields.io/badge/formik-2.4.5-brightgreen)
![react-dropzone](https://img.shields.io/badge/react--dropzone-14.2.3-red)
![react-helmet](https://img.shields.io/badge/react--helmet-6.1.0-orange)
![react-share](https://img.shields.io/badge/react--share-4.4.1-blue)
![react-slick](https://img.shields.io/badge/react--slick-0.29.0-purple)
![react-spinners](https://img.shields.io/badge/react--spinners-0.13.8-lightblue)
![react-toastify](https://img.shields.io/badge/react--toastify-9.1.3-yellow)
![slick-carousel](https://img.shields.io/badge/slick--carousel-1.8.1-pink)
![yup](https://img.shields.io/badge/yup-1.3.2-brightgreen)

"This repository contains the source code for a ticket management application designed for concerts and events. Users can add their favorite events to their favorites, select seats based on seat numbers, add the ticket to their cart, and make purchases."

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [RecipeAPI](#recipeapi)
- [Installation](#installation)
- [Usage](#usage)
- [User](#user)
- [Build](#build)
- [Technologies](#technologies)
- [Contributing](#contributing)

## Demo

<img width = "700px" src=""/>


## Features

- **View Concerts:** Users can view available concerts and events.
- **Add to Favorites:** Users can add their favorite concerts or events to their favorites for easy access later.
- **Price Determination and Purchase Based on Seat Numbers:** Users can view prices based on specific seat numbers for a concert and purchase tickets for their preferred seats.
- **User Registration and Login:** Users can register for the application and log into their accounts to save their favorite lists and purchase history.
-**Filtering by Category, Date, and City:**Users can filter concerts by category, date, and city to easily find events of their interest.
-**Search by Artist or Title:**Users can search for events or artists by their names, making it easier to find specific concerts or performances.


## EventAPI



### Endpoints



## Installation

1. Clone the repository:

```javascript
git clone https://github.com/musayar9/activity.git
cd activity
```

2. Install dependencies:

```
npm install
```

or

```
yarn
```

## Usage

1. Before run the app, add the following information to the .env file in the root directory:

```javascript
// VITE_RECIPE_API_URL = https://api.spoonacular.com/recipes
// VITE_USER_API_URL = http://localhost:3001
```

2. Run the app locally:

```
npm run dev
```

or 
```
yarn dev
```

The app will be accessible at `http://localhost:3000`.

3. To launch JSON Server with the JSON file you've created, run the following command:

```
json-server --watch db.json --port 3001
```

Once launch server, will be accessible at `http://localhost:3001/users`

## User

To start using the app sign up an then login 

## Build

Create a production build:

```
npm run build
```

## Technologies

- **React (18.2.0)**: The main version of the JavaScript library React.
- **React-DOM (18.2.0)**: Package used to link React applications to the DOM.
- **Axios (1.6.0)**: Popular JavaScript library used for making HTTP requests.
- **React-Icons (4.11.0)**: Package providing an extensive collection of icons for React applications.
- **React-Router-Dom (6.18.0)**: Package used for page routing and navigation in React-based web applications.
- **UUID (9.0.1)**: Package used to generate unique identifiers.
- **@emotion/react (11.11.1)**: React integration of the emotion CSS-in-JS library.
- **@emotion/styled (11.11.0)**: Package to use styled components with the emotion CSS-in-JS library in React.
- **@mui/icons-material (5.14.16)**: Package providing Material-UI icon components.
- **@mui/material (5.14.17)**: Package providing React components and theming support in Material-UI.
- **axios (1.6.0)**: Popular JavaScript library used for making HTTP requests.
- **date-fns (2.30.0)**: Lightweight JavaScript date utility library for date and time manipulation.
- **flowbite (2.0.0)**: Fast and flexible CSS library.
- **formik (2.4.5)**: Form management library for React forms.
- **react-dropzone (14.2.3)**: React component used for file upload functionalities.
- **react-helmet (6.1.0)**: Package used to manage page titles and other meta tags in React applications.
- **react-share (4.4.1)**: Package providing React components for sharing content on social media.
- **react-slick (0.29.0)**: Package offering React components for elements like carousels and sliders.
- **react-spinners (0.13.8)**: React components used to create loading spinners.
- **react-toastify (9.1.3)**: React component used for notification messages.
- **slick-carousel (1.8.1)**: JavaScript-based package for elements like carousels and sliders.
- **yup (1.3.2)**: Lightweight package used for schema-based validation.

## Contributing

Contributions are welcome! If you encounter issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## Show your support

If you find this project interesting, consider giving it a ⭐️ to show your support.
