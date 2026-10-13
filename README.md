# CS 499 — HappyBirthday.com Capstone

**Fernando Sepulveda | Southern New Hampshire University**

This repository documents the enhancement of **Travlr Getaways**, an earlier CS 465 full-stack project, toward a birthday-management application named **HappyBirthday.com** for the CS 499 Computer Science Capstone.

## Project structure

After the source files are uploaded, the repository will contain:

- `original/travlr/` — baseline Travlr application, retained for comparison.
- `enhanced/travlr/` — enhanced application and associated tests.
- `enhanced/travlr/tests/` — birthday and trip algorithm test scripts.
- Enhancement notes and narratives — explanations of design decisions, trade-offs, testing, and reflection.

**Source upload status:** The project files are being prepared for upload. This README does not mean that the folders above are already present.

## Three enhancement areas

1. **Software design and engineering:** extend and refactor the existing Node.js/Express architecture.
2. **Algorithms and data structures:** birthday date calculations, searching, sorting, and indexed lookups.
3. **Databases:** MongoDB/Mongoose data modeling, validation, indexes, and CRUD routes.

## Verification and limitations

Local birthday and trip algorithm tests passed during preparation of the cleaned source package. The API's database integration still requires final verification. Authentication, per-user ownership checks, and privacy protections require additional work; this is an academic portfolio project, **not a production-ready service**.

## Local development

Consult the `package.json` files in the enhanced project for available scripts. After the source folders are uploaded, install dependencies in the relevant Node.js project directories using `npm install`. Do not commit `node_modules`, credentials, or private birthday records.

## Portfolio

[CS 499 ePortfolio](https://dkanoxx.github.io/html-profile/)

## AI use acknowledgment

AI-assisted drafting, code review, and project organization were used during capstone preparation. Final technical behavior should be verified using the included source code, tests, and documentation.
