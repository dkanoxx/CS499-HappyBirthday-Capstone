CS 465 Module Four - Travlr Getaways MongoDB/Mongoose Notes

This project includes the Module Four updates:

1. Database Access Module
- app_server/models/db.js connects the Express/Node application to MongoDB using Mongoose.
- The file includes connection, error, disconnected, and graceful shutdown handling.

2. API Integration
- app_server/models/travlr.js defines the Trip schema with validation using Mongoose.
- app_api/controllers/trips.js retrieves Trip data from MongoDB and returns it as JSON.
- app_api/routes/index.js exposes JSON endpoints:
  GET /api/trips
  GET /api/trips/:tripCode

3. Populate Database
- app_server/data/trips.json contains the sample trip data.
- scripts/seed.js loads the sample trip data into the MongoDB trips collection.
- Run: npm run seed

4. Testing
- Start MongoDB locally.
- Run: npm install
- Run: npm run seed
- Run: npm start
- Open: http://localhost:3000
- Open: http://localhost:3000/travel
- Test JSON API: http://localhost:3000/api/trips
- Inspect MongoDB with mongosh:
  use travlr
  db.trips.find().pretty()
