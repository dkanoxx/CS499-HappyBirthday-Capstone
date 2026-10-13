const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const validateTrip = require('../middleware/validate-trip');

const ctrlBirthdays = require('../controllers/birthdays');
const validateBirthday = require('../middleware/validate-birthday');

router.route('/trips')
  .get(ctrlTrips.tripsList)
  .post(validateTrip, ctrlTrips.tripsAddTrip);

router.route('/trips/:tripCode')
  .get(ctrlTrips.tripsReadOne)
  .put(validateTrip, ctrlTrips.tripsUpdateOne)
  .delete(ctrlTrips.tripsDeleteOne);

router.route('/birthdays')
  .get(ctrlBirthdays.birthdaysList)
  .post(validateBirthday, ctrlBirthdays.birthdaysAdd);

router.route('/birthdays/id/:birthdayId')
  .put(validateBirthday, ctrlBirthdays.birthdaysUpdateOne)
  .delete(ctrlBirthdays.birthdaysDeleteOne);

router.get(
  '/birthdays/:name/:month/:day',
  ctrlBirthdays.birthdaysReadOne
);

module.exports = router;