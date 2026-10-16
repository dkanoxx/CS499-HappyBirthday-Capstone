# Enhancement Three — Databases

**CS 499 Computer Science Capstone | Fernando Sepulveda**

## Original artifact
This enhancement builds on the MongoDB and Mongoose architecture of **Travlr Getaways**, developed for CS 465. Rather than replacing the original full-stack project, **HappyBirthday.com** extends the existing backend to manage birthday records.

## Purpose of the enhancement
The database enhancement focuses on storing birthday information reliably, validating incoming data, supporting application queries, and connecting persistent records to a usable web interface. It demonstrates the relationship between database design, application logic, and data integrity.

## Implemented work
- Used **MongoDB** to persist birthday records beyond the lifetime of the application process.
- Integrated **Mongoose** models with Express controllers and REST API routes.
- Implemented birthday create, read, update, and delete (CRUD) workflows.
- Added input validation to reject malformed birthday submissions.
- Worked on data integrity concerns, including duplicate records and date validation.
- Integrated session-based account authentication into the broader application.

## Design decisions
Keeping data access in backend controllers and models separates database operations from the Angular interface. Server-side validation is important because frontend checks alone can be bypassed. Indexes should be chosen based on actual query patterns and tested with representative records, rather than added without a clear purpose.

## Testing and verification
During local development, the application was used to exercise birthday CRUD workflows with MongoDB. The final evidence package should include the relevant Mongoose schema, controller methods, API request/response examples, and test results. Confirm the precise index definitions and duplicate-handling behavior against the final submitted code before making detailed claims about them.

## Security and limitations
Registration, login, session checks, and logout have been implemented. **Per-user authorization of birthday records is not yet implemented**, so the project should not be presented as a secure public multi-user service. Additional privacy controls, security testing, and production configuration would be needed before deployment.

## Reflection
This enhancement helped me understand how database choices affect the reliability of an entire application. Working across models, controllers, validation, and the frontend reinforced that data integrity is not just a database concern; it depends on coordinated decisions throughout the software.

## Final submission evidence checklist
- Original Travlr source and enhanced HappyBirthday.com source
- Mongoose Birthday model and relevant validation logic
- Birthday controller and API route examples
- Evidence of successful create, read, update, and delete operations
- Screenshots or logs showing the database-backed application
- Explanation of any indexes and uniqueness constraints actually present in the code


## Database Evidence

[MongoDB Compass birthday collection screenshot](evidence/screenshots/Screenshot%202026-10-15%20235517.png) — shows the local `travlr.birthdays` collection with three saved documents. This confirms stored birthday records; it does not independently verify access controls or production security.
