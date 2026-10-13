# Enhancement One: Software Design and Engineering

## Artifact and rationale

For my CS 499 capstone, I selected Travlr Getaways, a full-stack application from CS 465. It provides an existing Node.js/Express server, API patterns, Mongoose integration, and Angular administrative interface. Enhancing an existing project gives me a way to demonstrate improvements to real application structure rather than presenting an unrelated new program.

## Enhancements

I improved server configuration by moving settings toward environment-based configuration, introduced request-size limits, and standardized responses for missing routes and server errors. I added reusable API validation and sanitization, removed obsolete route code, and improved the Angular administrative implementation with environment configuration and typed Trip arrays. I also addressed URL-safe trip codes, component communication using EventEmitter instead of page reloads, and user-facing status and error messages.

These changes emphasize separation of concerns and maintainability. Centralizing shared behavior reduces duplication, while typed data and explicit component communication make the administrative application easier to reason about.

## Reflection and evidence

The key lesson from this enhancement is that software quality depends on more than adding features. A project becomes easier to maintain when configuration, validation, error handling, and communication between components are deliberate.

Evidence: [Software engineering enhancement notes](../enhanced/travlr/ENHANCEMENT_NOTES.md) and the [enhanced application](../enhanced/travlr/).

## Scope and limitations

The software engineering enhancement does not, by itself, establish production-grade authentication or authorization. The birthday algorithms and database changes are documented separately in the subsequent enhancements.
