'use strict';
const assert = require('node:assert/strict');
const {
  searchTrips,
  filterTripsByMaxPrice,
  mergeSortTrips,
  buildTripCodeIndex,
  addDaysUntilStart,
  processTrips
} = require('../app_api/algorithms/trip-algorithms');

const trips = [
  { code: 'B0103', name: 'Barbados', resort: 'Island Resort', perPerson: '$1,200', start: '2026-12-10', description: 'Beach trip' },
  { code: 'B0101', name: 'Cancun', resort: 'Ocean Resort', perPerson: '$900', start: '2026-10-15', description: 'Mexico beach vacation' },
  { code: 'B0102', name: 'Machu Picchu', resort: 'Mountain Lodge', perPerson: '$1,500', start: '2027-01-05', description: 'Adventure trip' }
];

assert.deepEqual(searchTrips(trips, 'beach').map(t => t.code), ['B0103', 'B0101']);
assert.deepEqual(filterTripsByMaxPrice(trips, 1000).map(t => t.code), ['B0101']);
assert.deepEqual(mergeSortTrips(trips, 'price').map(t => t.code), ['B0101', 'B0103', 'B0102']);
assert.deepEqual(mergeSortTrips(trips, 'name', 'desc').map(t => t.name), ['Machu Picchu', 'Cancun', 'Barbados']);

const index = buildTripCodeIndex(trips);
assert.equal(index.get('b0101').name, 'Cancun');

const dated = addDaysUntilStart([trips[1]], new Date(2026, 8, 27));
assert.equal(dated[0].daysUntilStart, 18);

const processed = processTrips(trips, { search: 'trip', maxPrice: 1300, sortBy: 'price' });
assert.deepEqual(processed.map(t => t.code), ['B0103']);

assert.throws(() => filterTripsByMaxPrice(trips, 'not-a-number'), /maxPrice/);
console.log('All trip algorithm tests passed.');
