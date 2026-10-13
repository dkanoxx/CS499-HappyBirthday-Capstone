'use strict';
const assert = require('assert');
const {
  isLeapYear,
  getNextBirthday,
  daysUntilBirthday,
  searchBirthdays,
  sortUpcomingBirthdays,
  buildBirthdayIndex
} = require('../app_api/algorithms/birthday-algorithms');

const birthdays = [
  { name: 'Ava', month: 10, day: 15, relationship: 'Daughter' },
  { name: 'Maria', month: 12, day: 10, relationship: 'Friend' },
  { name: 'Carlos', month: 6, day: 25, relationship: 'Friend' }
];

assert.strictEqual(isLeapYear(2024), true);
assert.strictEqual(isLeapYear(2025), false);

// Year boundary: Dec. 31 -> Jan. 1 is one day.
assert.strictEqual(daysUntilBirthday({ name: 'New Year', month: 1, day: 1 }, new Date('2026-12-31T12:00:00Z')), 1);

// Birthday today.
assert.strictEqual(daysUntilBirthday({ name: 'Today', month: 9, day: 27 }, new Date('2026-09-27T23:30:00Z')), 0);

// Leap-day policy: Feb. 29 is observed Feb. 28 in a non-leap year.
assert.strictEqual(getNextBirthday({ name: 'Leap', month: 2, day: 29 }, new Date('2025-02-27T18:00:00Z')).toISOString().slice(0, 10), '2025-02-28');

// UTC normalization prevents local time-zone offsets from shifting the date calculation.
assert.strictEqual(daysUntilBirthday({ name: 'UTC Test', month: 9, day: 28 }, new Date('2026-09-27T12:00:00-04:00')), 1);

assert.deepStrictEqual(searchBirthdays(birthdays, 'daughter').map(x => x.name), ['Ava']);

const sorted = sortUpcomingBirthdays(birthdays, new Date('2026-09-27T12:00:00Z'));
assert.deepStrictEqual(sorted.map(x => x.name), ['Ava', 'Maria', 'Carlos']);

const withDuplicate = [...birthdays, { ...birthdays[0] }];
const { index, duplicates } = buildBirthdayIndex(withDuplicate);
assert.strictEqual(index.size, 3);
assert.strictEqual(duplicates.length, 1);

console.log('All birthday algorithm tests passed.');
