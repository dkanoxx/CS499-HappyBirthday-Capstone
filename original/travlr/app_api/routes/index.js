const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const validateTrip = require('../middleware/validate-trip');

router.route('/trips').get(ctrlTrips.tripsList).post(validateTrip, ctrlTrips.tripsAddTrip);
router.route('/trips/:tripCode').get(ctrlTrips.tripsReadOne).put(validateTrip, ctrlTrips.tripsUpdateOne).delete(ctrlTrips.tripsDeleteOne);
module.exports = router;
