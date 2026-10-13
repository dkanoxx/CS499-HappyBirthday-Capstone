const requiredFields = ['code', 'name', 'length', 'start', 'resort', 'perPerson', 'image', 'description'];
const normalizeString = (value) => typeof value === 'string' ? value.trim() : value;

const validateTrip = (req, res, next) => {
  const sanitized = {};
  for (const field of requiredFields) sanitized[field] = normalizeString(req.body[field]);

  const missingFields = requiredFields.filter((field) => !sanitized[field]);
  if (missingFields.length) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }
  if (!/^[A-Za-z0-9-]{2,20}$/.test(sanitized.code)) {
    return res.status(400).json({ message: 'Trip code must be 2-20 characters and contain only letters, numbers, or hyphens.' });
  }
  if (Number.isNaN(new Date(sanitized.start).getTime())) {
    return res.status(400).json({ message: 'Start date must be a valid date.' });
  }
  req.body = sanitized;
  return next();
};
module.exports = validateTrip;
