'use strict';

// Convert values such as "$1,299" or "1299" into a number for comparisons.
const parsePrice = (value) => {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value ?? '').replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

// O(n) linear search. A partial, case-insensitive match is useful for small
// collections and does not require the data to be pre-sorted.
const searchTrips = (trips, term) => {
  const query = normalizeText(term);
  if (!query) return [...trips];

  return trips.filter((trip) =>
    [trip.code, trip.name, trip.resort, trip.description]
      .some((value) => normalizeText(value).includes(query))
  );
};

// O(n) filtering by a maximum per-person price.
const filterTripsByMaxPrice = (trips, maxPrice) => {
  if (maxPrice === undefined || maxPrice === null || maxPrice === '') {
    return [...trips];
  }

  const limit = Number(maxPrice);
  if (!Number.isFinite(limit) || limit < 0) {
    throw new Error('maxPrice must be a non-negative number');
  }

  return trips.filter((trip) => parsePrice(trip.perPerson) <= limit);
};

const compareValues = (left, right, key) => {
  if (key === 'price') return parsePrice(left.perPerson) - parsePrice(right.perPerson);
  if (key === 'start') return new Date(left.start).getTime() - new Date(right.start).getTime();

  const a = normalizeText(left[key] ?? left.name);
  const b = normalizeText(right[key] ?? right.name);
  return a.localeCompare(b);
};

// Stable merge sort: O(n log n) time and O(n) auxiliary space.
// Implemented explicitly to demonstrate an algorithm rather than relying on
// Array.prototype.sort().
const mergeSortTrips = (trips, key = 'name', order = 'asc') => {
  const direction = normalizeText(order) === 'desc' ? -1 : 1;

  const merge = (left, right) => {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (direction * compareValues(left[i], right[j], key) <= 0) {
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

  return sort([...trips]);
};

// O(1) average lookup after an O(n) preprocessing pass. This demonstrates a
// Map data structure and the time/space trade-off of building an index.
const buildTripCodeIndex = (trips) => {
  const index = new Map();
  for (const trip of trips) {
    if (trip && trip.code !== undefined) index.set(normalizeText(trip.code), trip);
  }
  return index;
};

// Adds a derived value useful to the UI without mutating the original records.
const addDaysUntilStart = (trips, now = new Date()) => {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;

  return trips.map((trip) => {
    const start = new Date(trip.start);
    const daysUntilStart = Number.isNaN(start.getTime())
      ? null
      : Math.ceil((start.getTime() - startOfToday.getTime()) / msPerDay);
    return { ...trip, daysUntilStart };
  });
};

const processTrips = (trips, options = {}) => {
  let result = searchTrips(trips, options.search);
  result = filterTripsByMaxPrice(result, options.maxPrice);
  result = mergeSortTrips(result, options.sortBy || 'name', options.order || 'asc');
  return addDaysUntilStart(result);
};

module.exports = {
  parsePrice,
  searchTrips,
  filterTripsByMaxPrice,
  mergeSortTrips,
  buildTripCodeIndex,
  addDaysUntilStart,
  processTrips
};
