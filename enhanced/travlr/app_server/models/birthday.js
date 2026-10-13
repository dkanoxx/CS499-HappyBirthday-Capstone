'use strict';

const mongoose = require('mongoose');

// Validate that the day actually exists in the selected month.
// February is allowed up to 29 because the birthday may be Feb. 29.
function validBirthdayDay(day) {
  const month = this.month;

  const daysInMonth = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  return Number.isInteger(day) &&
    Number.isInteger(month) &&
    day >= 1 &&
    day <= daysInMonth[month];
}

const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 1,
    maxlength: 100
  },

  month: {
    type: Number,
    required: [true, 'Month is required'],
    min: 1,
    max: 12
  },

  day: {
    type: Number,
    required: [true, 'Day is required'],
    validate: {
      validator: validBirthdayDay,
      message: 'Day is not valid for the selected month'
    }
  },

  relationship: {
    type: String,
    trim: true,
    maxlength: 50,
    default: ''
  },

  reminderEnabled: {
    type: Boolean,
    default: true
  },

  notes: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  }
}, {
  timestamps: true
});

// Supports birthday lookup and sorting by month/day.
birthdaySchema.index({ month: 1, day: 1 });

// Helps prevent duplicate birthday records with the same
// normalized name and birthday date.
birthdaySchema.index(
  { name: 1, month: 1, day: 1 },
  { unique: true }
);

mongoose.model('Birthday', birthdaySchema, 'birthdays');