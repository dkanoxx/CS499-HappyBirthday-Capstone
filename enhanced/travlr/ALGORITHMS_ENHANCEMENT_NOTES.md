# Milestone Three — Enhancement Two: Algorithms and Data Structure

## Purpose
This version continues the transformation of the original CS 465 Travlr Getaways artifact into HappyBirthday.com while preserving traceability to the original architecture.

## Implemented enhancement
- Added `app_api/algorithms/birthday-algorithms.js`.
- Added next-birthday and days-remaining calculations.
- Added O(n) birthday search.
- Added stable merge sort for upcoming birthdays: O(n log n) time, O(n) auxiliary space.
- Added a `Map` index: O(n) preprocessing and O(1) average lookup.
- Added duplicate-key detection so index construction does not silently overwrite duplicate birthday records.
- Normalized calendar calculations to UTC to reduce time-zone/date-boundary errors.
- Defined and tested a Feb. 29 policy: observe on Feb. 28 in non-leap years for this implementation.
- Added server-side birthday input validation.
- Added birthday API/controller/model using the existing Travlr Express/Mongoose patterns.
- Added automated tests for leap years, Feb. 29, year boundaries, time-zone offsets, birthday-today, search, sort, and duplicate keys.
- Added `docs/TRAVLR_TO_HAPPYBIRTHDAY_TRACEABILITY.md`.

## Run the algorithm tests
From the enhanced `travlr` directory:

```bash
npm run test:birthdays
```

## Scope note
This milestone demonstrates Algorithms and Data Structures. Authorization, per-user ownership, privacy controls, and database indexes based on measured query patterns are retained as required follow-up items for later enhancements/final ePortfolio polish.
