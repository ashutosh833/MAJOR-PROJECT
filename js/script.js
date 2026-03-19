// controllers/listingController.js

const axios = require("axios");

async function getCoords(place) {
    const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`,
        {
            headers: { "User-Agent": "wanderlust" }
        }
    );

    if (res.data.length > 0) {
        return {
            lat: parseFloat(res.data[0].lat),
            lng: parseFloat(res.data[0].lon)
        };
    } else {
        return null;
    }
}

module.exports.getCoordinates=getCoords;