# Midtown Munchies

---

## Project Purpose:

This app lists restaurants in Midtown Manhattan in New York. This project was created for the Udacity Front End Nanodegree Program. The purpose is to demonstrate understanding of the basic structure and operation of a React-based app.

The Google Maps API is used to generate the map. The restaurant list pulled by using calls to the Foursquare API.

## Loading the App in Development Mode:

The project uses Node.js and Create-React-App. You can download Node.js from here: [Node.js](https://nodejs.org/en/)

Once Node.js is installed, navigate to the directory you want to store the app and run the npm install

```
npm install
```

Once installed you can start the app with

```
npm start
```

If a new browser window does not load, open a browser window and navigate to [http://localhost:3000/](http://localhost:3000/)

Note that the service worker will only cache the site when it is in production mode.

## Loading the App in Production Mode

To run the app locally, use:

```
npm run build
```

Navigate to the `build` directory and run a localhost server. If you have Python 2.x installed you can run the Python Simple Server like this.

```
python -m SimpleHTTPServer 8080
```

For Python 3.x, the command is:

```
-m http.server 8080
```

In either case navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Or if you prefer you can use Node [serve](https://github.com/zeit/serve). If you do not have it installed you can install it with:

```
npm install -g serve
```

and then navigate into the build directory and run

```
serve -s
```

In this case the site will be hosted at [http://localhost:5000](http://localhost:5000)

## Foursquare and Google Maps keys
You will need to add your own Foursquare and Google Map keys. They are stored in 'credentials.js` 

## Using the App

The app loads displaying the midtown Manhattan area with markers for restaurants and a list of restaurants on the side
Click on a marker or restaurant name on the list to get information about each restaurant

### Resources:

- [Create-react-app Documentation](https://github.com/facebookincubator/create-react-app)
- [React API](https://facebook.github.io/react/docs/react-api.html)
- [React-script-loader](https://www.npmjs.com/package/react-async-script-loader)
- [SVG-Loaders by Sam Herber](https://github.com/SamHerbert/SVG-Loaders)
- [Foursquare API - Venue Search](https://developer.foursquare.com/docs/api/venues/search)
- [Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)
