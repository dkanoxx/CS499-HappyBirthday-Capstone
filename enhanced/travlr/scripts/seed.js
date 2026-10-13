require('../app_server/models/db');
const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');
const trips = require('../app_server/data/trips.json');

const seedTrips = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
        console.log(`${trips.length} trip records loaded successfully.`);
    } catch (err) {
        console.error('Error loading trip data:', err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seedTrips();
