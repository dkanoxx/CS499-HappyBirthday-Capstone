# Enhancement Two — Algorithms and Data Structures

**CS 499 Computer Science Capstone | Fernando Sepulveda**

## Original artifact and enhancement context
This enhancement continues the **Travlr Getaways** project originally developed for CS 465. The enhanced application, **HappyBirthday.com**, uses the existing Node.js/Express and Angular architecture to introduce birthday-related algorithms and data-processing features.

## Enhancement goals
The goal was to demonstrate algorithmic thinking by implementing and testing birthday calculations, searching, sorting, and record lookups. The enhancement also provided an opportunity to consider how data structures affect correctness, performance, and maintainability.

## Algorithms and data structures
- **Birthday date calculations:** Determine the next occurrence of a birthday and the number of days remaining.
- **Leap-year handling:** Account for February 29 and other calendar edge cases according to the application's defined behavior.
- **Searching and filtering:** Locate birthday records using relevant attributes and support the dashboard's search workflow.
- **Sorting:** Present birthday information in a useful order, including upcoming birthdays.
- **Record lookups:** Organize access to birthday records and evaluate lookup behavior as the dataset grows.

## Design considerations
Date calculations require particular care around year boundaries, leap years, and consistent handling of dates. Search and sort logic should produce predictable results for empty collections, repeated names, and records with similar dates. Any claimed performance improvements should be supported by code inspection or measurements rather than assumed.

## Testing and evidence
During development, the birthday algorithm test script was run locally and reported: **“All birthday algorithm tests passed.”** This is evidence of a successful local test run, not proof that every edge case or integration scenario has been covered.

Before final submission, attach or link:
1. The original and enhanced source code showing the algorithm changes.
2. The birthday algorithm test file and its actual assertions.
3. A screenshot or captured terminal output of the passing tests.
4. A brief explanation of the observed behavior for leap days, year boundaries, and duplicate records.

## Reflection
This enhancement strengthened my ability to move beyond a feature that simply appears to work and think carefully about correctness, edge cases, and the choice of algorithms and data structures. It also reinforced the value of repeatable tests and documentation when extending an existing application.

## Limitations and next steps
The final portfolio should verify the precise algorithms and data structures in the submitted source code, document their complexity where appropriate, and avoid claiming coverage for edge cases that have not been explicitly tested.
