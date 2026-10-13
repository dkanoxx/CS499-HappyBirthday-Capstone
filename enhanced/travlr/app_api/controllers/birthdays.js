'use strict';

const mongoose = require('mongoose');
const Birthday = mongoose.model('Birthday');
const {
  processBirthdays,
  buildBirthdayIndex
} = require('../algorithms/birthday-algorithms');

const birthdaysList = async (req, res) => {
  try {
    const birthdays = await Birthday.find({}).lean();

    const processed = processBirthdays(birthdays, {
      search: req.query.search
    });

    return res.status(200).json(processed);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving birthdays',
      error: err.message
    });
  }
};

const birthdaysReadOne = async (req, res) => {
  try {
    const birthdays = await Birthday.find({}).lean();

    const { index } = buildBirthdayIndex(birthdays);

    const key =
      `${req.params.name}|${req.params.month}|${req.params.day}`
        .trim()
        .toLowerCase();

    const birthday = index.get(key);

    if (!birthday) {
      return res.status(404).json({
        message: 'Birthday not found'
      });
    }

    return res.status(200).json(birthday);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving birthday',
      error: err.message
    });
  }
};

const birthdaysAdd = async (req, res) => {
  try {
    const birthday = await Birthday.create({
      name: req.body.name,
      month: req.body.month,
      day: req.body.day,
      relationship: req.body.relationship,
      reminderEnabled: req.body.reminderEnabled ?? true,
      notes: req.body.notes || ''
    });

    return res.status(201).json(birthday);
  } catch (err) {
    return res.status(400).json({
      message: 'Error adding birthday',
      error: err.message
    });
  }
};

const birthdaysUpdateOne = async (req, res) => {
  try {
    const birthday = await Birthday.findById(req.params.birthdayId);

    if (!birthday) {
      return res.status(404).json({
        message: 'Birthday not found'
      });
    }

    birthday.name = req.body.name ?? birthday.name;
    birthday.month = req.body.month ?? birthday.month;
    birthday.day = req.body.day ?? birthday.day;
    birthday.relationship =
      req.body.relationship ?? birthday.relationship;
    birthday.reminderEnabled =
      req.body.reminderEnabled ?? birthday.reminderEnabled;
    birthday.notes = req.body.notes ?? birthday.notes;

    await birthday.save();

    return res.status(200).json(birthday);
  } catch (err) {
    return res.status(400).json({
      message: 'Error updating birthday',
      error: err.message
    });
  }
};

const birthdaysDeleteOne = async (req, res) => {
  try {
    const birthday = await Birthday.findByIdAndDelete(
      req.params.birthdayId
    );

    if (!birthday) {
      return res.status(404).json({
        message: 'Birthday not found'
      });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({
      message: 'Error deleting birthday',
      error: err.message
    });
  }
};

module.exports = {
  birthdaysList,
  birthdaysReadOne,
  birthdaysAdd,
  birthdaysUpdateOne,
  birthdaysDeleteOne
};