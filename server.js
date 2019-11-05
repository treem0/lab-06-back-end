require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Application Setup
// - make an express app!
// - get the port on which to run the server
// - enable CORS
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/location', (request, response) => {
    try {
        // use express built-in query object
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);
    }
    catch (err) {
        // TODO: make an object and send via .json...
        response.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/weather', (request, response) => {
    try {
        // use express built-in query object
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);
    }
    catch (err) {
        // TODO: make an object and send via .json...
        response.status(500).send('Sorry something went wrong, please try again');
    }
});
const geoData = require('./data/geo.json');
const geoWeather = require('./data/darksky.json');
// Helper Functions
function getLatLng(location) {
    // simulate an error if special "bad location" is provided:
    if (location === 'bad location') {
        throw new Error();
    }

    // ignore location for now, return hard-coded file
    // api call will go here

    // convert to desired data format:
    return toLocation(geoData);
}
function getWeather(weather) {
    // simulate an error if special "bad location" is provided:
    if (weather === 'bad weather') {
        throw new Error();
    }

    // ignore location for now, return hard-coded file
    // api call will go here

    // convert to desired data format:
    return toWeather(geoWeather);
}

function toLocation(/*geoData*/) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;
    
    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

function toWeather(geoWeather) {
    const firstResult = geoWeather.currently.summary;
    const time = geoWeather.currently.time;
    
    return {
        formatted_query: firstResult,
        time: time
    };
}



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});