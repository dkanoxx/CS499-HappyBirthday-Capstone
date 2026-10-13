const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');
const fallbackTrips = require('../data/trips.json');

const formatTrip = trip => {
    const plainTrip = trip.toObject ? trip.toObject() : trip;
    return {
        ...plainTrip,
        start: plainTrip.start instanceof Date
            ? plainTrip.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : plainTrip.start
    };
};

const travel = async (req, res) => {
    try {
        const trips = await Trip.find({}).sort({ code: 1 }).lean();
        res.render('travel', {
            title: 'Travlr Getaways',
            pageHeader: 'Travel',
            trips: trips.length ? trips.map(formatTrip) : fallbackTrips
        });
    } catch (err) {
        console.error('Error retrieving trips from MongoDB:', err.message);
        res.render('travel', {
            title: 'Travlr Getaways',
            pageHeader: 'Travel',
            trips: fallbackTrips
        });
    }
};

module.exports = {
    travel
};
