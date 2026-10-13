'use strict';

const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

const isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

// Creates the birthday occurrence for a target year. Feb. 29 birthdays use
// Feb. 28 in non-leap years for this portfolio enhancement.
const birthdayOccurrence = (month, day, year) => {
  const numericMonth = Number(month);
  const numericDay = Number(day);
  if (!Number.isInteger(numericMonth) || numericMonth < 1 || numericMonth > 12) {
    throw new Error('month must be an integer from 1 through 12');
  }
  if (!Number.isInteger(numericDay) || numericDay < 1 || numericDay > 31) {
    throw new Error('day must be an integer from 1 through 31');
  }

  if (numericMonth === 2 && numericDay === 29 && !isLeapYear(year)) {
    return new Date(Date.UTC(year, 1, 28));
  }

  const occurrence = new Date(Date.UTC(year, numericMonth - 1, numericDay));
  if (occurrence.getUTCMonth() !== numericMonth - 1 || occurrence.getUTCDate() !== numericDay) {
    throw new Error('month/day combination is not a valid calendar date');
  }
  return occurrence;
};

const startOfUtcDay = (date) => new Date(Date.UTC(
  date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()
));

// O(1): determine the next birthday without looping through calendar days.
const getNextBirthday = (birthday, now = new Date()) => {
  const today = startOfUtcDay(now);
  let next = birthdayOccurrence(birthday.month, birthday.day, today.getUTCFullYear());
  if (next < today) {
    next = birthdayOccurrence(birthday.month, birthday.day, today.getUTCFullYear() + 1);
  }
  return next;
};

const daysUntilBirthday = (birthday, now = new Date()) => {
  const today = startOfUtcDay(now);
  const next = getNextBirthday(birthday, today);
  return Math.round((next.getTime() - today.getTime()) / 86400000);
};

// O(n) case-insensitive linear search across fields useful to the user.
const searchBirthdays = (birthdays, term) => {
  const query = normalizeText(term);
  if (!query) return [...birthdays];
  return birthdays.filter((birthday) =>
    [birthday.name, birthday.relationship, birthday.notes]
      .some((value) => normalizeText(value).includes(query))
  );
};

// Stable merge sort: O(n log n) time, O(n) auxiliary space.
const sortUpcomingBirthdays = (birthdays, now = new Date()) => {
  const decorated = birthdays.map((birthday, originalIndex) => ({
    birthday,
    originalIndex,
    daysRemaining: daysUntilBirthday(birthday, now)
  }));

  const merge = (left, right) => {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      const a = left[i];
      const b = right[j];
      if (a.daysRemaining < b.daysRemaining ||
          (a.daysRemaining === b.daysRemaining && a.originalIndex <= b.originalIndex)) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return result.concat(left.slice(i), right.slice(j));
  };

  const sort = (items) => {
    if (items.length <= 1) return items;
    const middle = Math.floor(items.length / 2);
    return merge(sort(items.slice(0, middle)), sort(items.slice(middle)));
  };

  return sort(decorated).map(({ birthday, daysRemaining }) => ({
    ...birthday,
    daysRemaining,
    nextBirthday: getNextBirthday(birthday, now).toISOString().slice(0, 10)
  }));
};

// O(n) preprocessing, O(1) average lookup. Duplicate keys are reported so
// records are not silently overwritten in the index.
const buildBirthdayIndex = (birthdays) => {
  const index = new Map();
  const duplicates = [];
  for (const birthday of birthdays) {
    const key = normalizeText(`${birthday.name}|${birthday.month}|${birthday.day}`);
    if (index.has(key)) duplicates.push(birthday);
    else index.set(key, birthday);
  }
  return { index, duplicates };
};

const processBirthdays = (birthdays, options = {}, now = new Date()) => {
  const searched = searchBirthdays(birthdays, options.search);
  return sortUpcomingBirthdays(searched, now);
};

module.exports = {
  isLeapYear,
  birthdayOccurrence,
  getNextBirthday,
  daysUntilBirthday,
  searchBirthdays,
  sortUpcomingBirthdays,
  buildBirthdayIndex,
  processBirthdays
};
