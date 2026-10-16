# Enhancement One — Software Design and Engineering

**CS 499 Computer Science Capstone | Fernando Sepulveda**

## Artifact and origin
This enhancement builds on **Travlr Getaways**, a full-stack application developed for CS 465. The original project used a Node.js/Express backend, REST API routes, MongoDB/Mongoose, and an Angular administrative interface. The enhanced project, **HappyBirthday.com**, retains and extends this architecture to support birthday management.

## Enhancement goals
The objective was to demonstrate the ability to extend existing software rather than replace it with an unrelated project. The work focused on separating responsibilities across API routes, controllers, middleware, data models, and frontend components, while delivering a more useful birthday-management workflow.

## Changes implemented
- Added birthday-focused API routes and controller operations for creating, listing, updating, and deleting records.
- Introduced birthday input-validation middleware in the Express routing layer.
- Built an Angular birthday dashboard with forms and controls for managing records.
- Integrated account registration, login, session checks, and logout through authentication routes.
- Connected the frontend to the backend API to support the user workflow.

## Engineering decisions
Reusing Travlr's Express routing and controller structure made the changes easier to trace and maintain. Validation middleware keeps input checks separate from controller logic. The Angular interface separates presentation and user interaction from backend data processing. Authentication endpoints establish a session-based sign-in flow.

## Testing and verification
The application was exercised locally with the Express backend and Angular frontend running. Registration, sign-in, session checking, and sign-out were tested during development. Birthday create, read, update, and delete workflows were developed and exercised. Final submission evidence should include dated screenshots, commands or test output, and links to the actual source files.

## Limitations and next steps
Authentication is present, but birthday routes still need per-user ownership authorization before this could be treated as a public multi-user application. Additional security review, production deployment configuration, and broader automated integration tests remain future work.

## Reflection
This enhancement demonstrates how I can revisit an earlier software project, preserve its underlying structure, and extend it with new functionality. It strengthened my experience with full-stack development, API design, validation, component-based interfaces, and debugging across the frontend and backend.

## Evidence to attach before final submission
- Original Travlr source and enhanced HappyBirthday.com source
- Screenshot of the birthday dashboard
- Screenshot or output demonstrating the authentication flow
- Source references for birthday routes, validation middleware, and Angular components

## Verified source references
- [Birthday API routes](enhanced/travlr/app_api/routes/index.js) expose list, create, lookup, update, and delete endpoints.
- [Birthday controller](enhanced/travlr/app_api/controllers/birthdays.js) uses Mongoose for CRUD and delegates search and sorting to the algorithms module.
- [Birthday validation middleware](enhanced/travlr/app_api/middleware/validate-birthday.js) checks names and calendar dates before create/update operations.
- [Birthday Mongoose model](enhanced/travlr/app_server/models/birthday.js) defines field validation and indexes.
- [Application screenshots](evidence/screenshots/) provide visual evidence of the interface.

**Security boundary:** The birthday controller currently queries all records and performs update/delete operations by ID without verifying ownership. Account sign-in alone does not establish record-level authorization. This remains a documented limitation, not a completed security enhancement.
