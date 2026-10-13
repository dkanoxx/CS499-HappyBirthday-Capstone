'use strict';
const { birthdayOccurrence } = require('../algorithms/birthday-algorithms');

module.exports = (req, res, next) => {
  const name = String(req.body.name ?? '').trim();
  const month = Number(req.body.month);
  const day = Number(req.body.day);
  if (!name) return res.status(400).json({ message: 'Name is required' });
  try {
    // 2024 is a leap year, allowing Feb. 29 while rejecting impossible dates.
    birthdayOccurrence(month, day, 2024);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  req.body.name = name;
  req.body.month = month;
  req.body.day = day;
  return next();
};
