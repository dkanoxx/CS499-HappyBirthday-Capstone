# HappyBirthday.com — Start Here

This application stores birthday records in MongoDB and uses a Node/Express API with an Angular dashboard.

## Requirements
- Node.js 24.15+ (or compatible Angular 22 supported version)
- MongoDB Community Server running locally, or a MongoDB Atlas URI

## Start the database
Ensure MongoDB is running on `mongodb://127.0.0.1:27017/travlr`, or set the `MONGODB_URI` environment variable before starting the backend.

## Start backend (PowerShell terminal 1)
From `enhanced\travlr`:
```powershell
npm install
npm start
```
Open http://localhost:3000/api/health — both `server: running` and `database: connected` are required.

## Start frontend (PowerShell terminal 2)
From `enhanced\travlr\app_admin`:
```powershell
npm install
npm start
```
Open http://localhost:4200.

## Functional smoke test
1. Add a birthday and save it. It should appear in the list.
2. Refresh the browser; the birthday should still be present.
3. Search for the name, edit it, then delete it.
4. Check Overview and All birthdays in the sidebar.
5. Test an invalid date such as February 30 (must be rejected).

## Current scope
- Working CRUD endpoints, search and countdown are implemented.
- Reminder preference is stored, but scheduled email/push notifications are **not implemented**.
- This is a capstone prototype, **not a production multi-user service**: accounts, authentication and per-user data isolation are not implemented. Do not deploy it publicly with personal birthday data.
