'use strict';
const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  month: { type: Number, required: true, min: 1, max: 12 },
  day: { type: Number, required: true, min: 1, max: 31 },
  relationship: { type: String, trim: true, default: '' },
  reminderEnabled: { type: Boolean, default: true },
  notes: { type: String, trim: true, default: '' }
}, { timestamps: true });

mongoose.model('Birthday', birthdaySchema, 'birthdays');
