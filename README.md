![app screenshot]()

# Wander Go Where App

This app was created using MERN stack (MongoDB, Express.js, React, Node.JS)

```
"We travel not to escape life, but for life not to escape us.” — Anonymous
```

# Getting started

There are two parts to this application.

- **Frontend**: https://github.com/everett-wxy/WanderGoWhereFrontEnd
- **Backend**: https://github.com/everett-wxy/WanderGoWhereBackEnd

We need to set both up before we proceed to run them.
Clone both repo to your computer, and create the respective .env file to your root folder for the Frontend, and Backend codes. Then, add in the foillowing:-

### Frontend

```
VITE_SERVER=a*
```

### Notations

- _a\*: local host ip address, with your port number_

### Backend

```
PORT=b*
MONGODB_URI=c*
ACCESS_SECRET=d*
REFRESH_SECRET=e*

AMADEUS_ID=f*
AMADEUS_SECRET=g*
```

### Notations

- _b\*: ensure the port number is the same as the one above_
- _c\*: this will be the link to your server database_
- _d\*: this secret is used for password access. _
- _e\*: _
- _f\*: You would need to visit the Amadeus website and obtain the ID. Insert it here. Link to Amadeus API can be found below_
- _g\*: You would need to visit the Amadeus website and obtain the secret. Insert it here. Link to Amadeus API can be found below_

Install the relevant dependancies and packages by opening up the terminal/gitbash, and running the codes below.

```
npm i
```

run the codes

```
npm run dev
```

# Using the app



# Attributions

For inspirations, we visited several sites for ideas:-

- [WanderLog](https://wanderlog.com/)
- [Agoda](https://www.agoda.com/)

Information was obtained from the Amadeus API:-

- [Amadeus](https://developers.amadeus.com/get-started/create-a-flight-booking-engine-651)

Database used:-

- [MongoDB](https://www.mongodb.com/)

For designs, we have used css,and bootstrap for the overall html styling:-

- [Bootstrap](https://getbootstrap.com/)

Images are obtained from these sites:-

- [insert here]()

Whenever we got stuck, or faced difficulties in implementing the codes or ideas, we would refer to the following for examples and write ups. Other sites use for reference can be found here too:-

- [W3Schools](https://www.w3schools.com/)
- [MDN](https://developer.mozilla.org/en-US/)
- [stackoverflow](https://stackoverflow.com/)
- [General Assembly Course Notes](https://generalassemb.ly/)
- [MediaWiki](https://www.mediawiki.org/wiki/API:Query)
- [React](https://react.dev/learn)
- [Random.org](https://www.random.org/)

# Technologies Used

1. HTML
1. CSS
1. JavaScript
1. React
1. Visual Studio
1. Github
1. Chrome
1. Bootstrap
1. Docker
1. Postman
1. Mongodb
1. Trello
1. MS Powerpoint

# Next Steps

Next steps: Planned future enhancements (stretch goals).

- have pre-planned trips based on budgets
- make the budget bar stay visible even when scrolling
- have the function to exclude showing activities and/or restaurants that may exceed the budget
- have the ability to share the planned trips with others
