# CS 499 — HappyBirthday.com Capstone

**Fernando Sepulveda | Southern New Hampshire University**

This repository documents the enhancement of **Travlr Getaways**, an earlier CS 465 full-stack project, toward a birthday-management application named **HappyBirthday.com** for the CS 499 Computer Science Capstone.

## Project structure

The repository contains:

- `original/travlr/` — baseline Travlr application, retained for comparison.
- `enhanced/travlr/` — enhanced application and associated tests.
- `enhanced/travlr/tests/` — birthday and trip algorithm test scripts.
- Enhancement notes and narratives — explanations of design decisions, trade-offs, testing, and reflection.

**Source status:** The original and enhanced project folders are present. Supporting screenshots and enhancement narratives are linked below.

## Three enhancement areas

1. **Software design and engineering:** extend and refactor the existing Node.js/Express architecture.
2. **Algorithms and data structures:** birthday date calculations, searching, sorting, and indexed lookups.
3. **Databases:** MongoDB/Mongoose data modeling, validation, indexes, and CRUD routes.

## Verification and limitations

Local birthday and trip algorithm tests passed during preparation of the cleaned source package. Local MongoDB persistence has been observed in MongoDB Compass. Registration, login, session checking, and logout are implemented; however, **per-user ownership authorization for birthday records is not implemented**. Additional privacy and security testing is needed. This is an academic portfolio project, **not a production-ready service**.

## Local development

Consult the `package.json` files in the enhanced project for available scripts. Install dependencies in the relevant Node.js project directories using `npm install`. Do not commit `node_modules`, credentials, or private birthday records.

## Enhancement narratives and evidence

- [Enhancement One — Software Design and Engineering](ENHANCEMENT_1_SOFTWARE_DESIGN.md)
- [Enhancement Two — Algorithms and Data Structures](ENHANCEMENT_2_ALGORITHMS_DATA_STRUCTURES.md)
- [Enhancement Three — Databases](ENHANCEMENT_3_DATABASES.md)
- [Application and MongoDB screenshots](evidence/screenshots/)
- [Birthday algorithm tests and test screenshot](enhanced/travlr/tests/)

## CS 499 Capstone Video Presentation

Watch the recorded presentation covering HappyBirthday.com, its three enhancement areas, and project testing.

[Watch the HappyBirthday.com capstone video on YouTube](https://youtu.be/pohzEwN6xlA)

## Portfolio

[CS 499 ePortfolio](https://dkanoxx.github.io/html-profile/)

## AI use acknowledgment

AI-assisted drafting, code review, and project organization were used during capstone preparation. Final technical behavior should be verified using the included source code, tests, and documentation.
