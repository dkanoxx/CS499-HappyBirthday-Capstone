# Enhancement Three: Databases

## Artifact and rationale

For the database enhancement, I extended the existing Travlr Express/Mongoose approach to store and manage birthday records. The goal was to demonstrate schema design, server-side validation, database operations, and handling of invalid input.

## Enhancements

The Birthday model defines fields for a person's name, month, day, relationship, reminder preference, and notes. Schema constraints limit field lengths and validate calendar values, including a February 29 allowance and rejection of impossible dates such as February 30. The implementation also includes a compound month/day index and a unique compound index involving name, month, and day.

The birthday API includes create, list, read, update, and delete operations, with server-side validation on write requests. These choices demonstrate how the application connects client requests to persistent data through controller and model layers.

## Verification and reflection

During earlier manual API checks, a valid February 29 record was accepted and an invalid February 30 record was rejected. CRUD requests were also exercised. Those observations should be independently repeated against a running MongoDB instance using the committed code before final submission; a full database integration test suite has not been confirmed.

This enhancement reinforced the importance of placing validation on the server, choosing indexes based on actual access patterns, and distinguishing an academic prototype from a secure multi-user application.

Evidence: [enhanced project](../enhanced/travlr/), including the birthday model, controller, routes, and validation middleware.

## Known limitations and future work

The currently reviewed implementation does not establish authentication or per-user record ownership. A unique index across name, month, and day may also reject matching birthdays belonging to different users, so it is not a substitute for user-scoped uniqueness. Raw database errors should be translated into safe API responses, and index effectiveness should be checked against real query patterns. No claim of production readiness is made.
