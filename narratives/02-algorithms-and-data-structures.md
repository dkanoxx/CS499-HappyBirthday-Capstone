# Enhancement Two: Algorithms and Data Structures

## Artifact and rationale

I continued enhancing the CS 465 Travlr application toward HappyBirthday.com, preserving its Express/Mongoose architecture. This enhancement focuses on computing upcoming birthdays and retrieving birthday records efficiently and predictably.

## Enhancements and trade-offs

The implementation adds next-birthday and days-remaining calculations, an O(n) case-insensitive search, and a stable merge sort for upcoming birthdays with O(n log n) running time and O(n) auxiliary space. A Map-based index takes O(n) time to build and supports O(1) average lookup by key. Duplicate-key detection avoids silently overwriting records while constructing the index.

For calendar calculations, the code normalizes dates to UTC to reduce time-zone boundary inconsistencies. The documented February 29 policy observes leap-day birthdays on February 28 in non-leap years. This is an application policy, not a universal convention.

The trade-off is that a Map requires additional memory and preprocessing, while merge sort allocates auxiliary space. Those costs can be justified when the application repeatedly performs indexed lookups or needs predictable stable ordering.

## Testing and reflection

Automated tests were added for leap years, February 29, year boundaries, time-zone offsets, birthdays occurring today, search, sorting, and duplicate keys. The documented command is `npm run test:birthdays` from `enhanced/travlr`. The birthday algorithm test suite passed during local preparation of the clean source package.

This enhancement taught me to define edge-case behavior explicitly, assess algorithmic complexity, and connect implementation choices to application requirements.

Evidence: [Algorithm enhancement notes](../enhanced/travlr/ALGORITHMS_ENHANCEMENT_NOTES.md), [algorithm implementation](../enhanced/travlr/app_api/algorithms/birthday-algorithms.js), [tests](../enhanced/travlr/tests/birthday-algorithms.test.js), and [architecture traceability](../enhanced/travlr/docs/TRAVLR_TO_HAPPYBIRTHDAY_TRACEABILITY.md).

## Scope and limitations

Efficient in-memory lookup does not replace database authorization, access controls, or query-performance measurement.
