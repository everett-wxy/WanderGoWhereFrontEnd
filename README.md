![app screenshot](/public/images/LandingPageSS.png)

# Wander Go Where App

![app logo](/public/images/Logo.png)

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

1. Click 'Sign up' on the Navbar and sign up for an account.

![Sign up page](/public/images/Sign-up-page.png)

2. Once you receive an alert that you have successfully signed up, navigate to the log in link on the navbar.

![Sign in page](/public/images/Sign-in-page.png)

3. Upon sign in, you will be navigated to your dashboard. Click on 'start planning' or 'add trip'.

![Dashboard](/public/images/empty-dashboard.png)

4. On the planboard, enter your budget for the trip and give your trip a great name.

![Planboard](/public/images/plan-page1.png)

5. Search for a flight from Singapore to any of these five cities: Cairo, Christchurch, Istanbul, Sapporo and Tromso.

![Planboard](/public/images/plan-page3.png)

6. Select a Departure flight, and the following options will appear:

- Select a returning flight.
- Select an accommodation.
- Select a/some activit(ies).
- Select a/some restaurant(s).

7. Return to your dashboard by clicking 'Dashboard' on your navbar to look at the overview of your planned trips.

![Dashboard](/public/images/Filled-dashboard.png)
![Dashboard](/public/images/Filled-dashboard2.png)

# Attributions

For inspirations, we visited several sites for ideas:-

- [WanderLog](https://wanderlog.com/)
- [Agoda](https://www.agoda.com/)
- [Booking](https://booking.com)

Information was obtained from the Amadeus API:-

- [Amadeus](https://developers.amadeus.com/get-started/create-a-flight-booking-engine-651)

Database used:-

- [MongoDB](https://www.mongodb.com/)

For overall html styling, we have used css and bootstrap:-

- [Bootstrap](https://getbootstrap.com/)

Images and graphics are obtained from these sites:-

- [Booking](https://booking.com)
- [Tripadvisor](https://tripadvisor.com)
- [Flaticon](https://flaticon.com/)
- [LOGO](https://logo.com)

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
