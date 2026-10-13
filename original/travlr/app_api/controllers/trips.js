const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ code: 1 }).lean();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trips', error: err.message });
  }
};

// GET one trip by code
const tripsReadOne = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).lean();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trip', error: err.message });
  }
};

// POST add trip
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json({ message: 'Error adding trip', error: err.message });
  }
};

// PUT update trip
const tripsUpdateOne = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.code = req.body.code || trip.code;
    trip.name = req.body.name || trip.name;
    trip.length = req.body.length || trip.length;
    trip.start = req.body.start || trip.start;
    trip.resort = req.body.resort || trip.resort;
    trip.perPerson = req.body.perPerson || trip.perPerson;
    trip.image = req.body.image || trip.image;
    trip.description = req.body.description || trip.description;

    const updatedTrip = await trip.save();
    return res.status(200).json(updatedTrip);
  } catch (err) {
    return res.status(400).json({ message: 'Error updating trip', error: err.message });
  }
};

// DELETE trip
const tripsDeleteOne = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
};

module.exports = {
  tripsList,
  tripsReadOne,
  tripsAddTrip,
  tripsUpdateOne,
  tripsDeleteOne
};
