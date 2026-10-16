
const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const validateTrip = require('../middleware/validate-trip');

const ctrlBirthdays = require('../controllers/birthdays');
const validateBirthday = require('../middleware/validate-birthday');

const ctrlAuth = require('../controllers/auth');

// ========================================
// AUTHENTICATION ROUTES
// ========================================

router.post('/auth/register', ctrlAuth.register);
router.post('/auth/login', ctrlAuth.login);
router.post('/auth/logout', ctrlAuth.logout);
router.get('/auth/me', ctrlAuth.me);

// ========================================
// TRAVLR ROUTES
// ========================================

router.route('/trips')
  .get(ctrlTrips.tripsList)
  .post(validateTrip, ctrlTrips.tripsAddTrip);

router.route('/trips/:tripCode')
  .get(ctrlTrips.tripsReadOne)
  .put(validateTrip, ctrlTrips.tripsUpdateOne)
  .delete(ctrlTrips.tripsDeleteOne);

// ========================================
// HAPPYBIRTHDAY ROUTES
// ========================================

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
