
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const config = require('./config');
require('./app_server/models/db');

const app = express();

// Required session configuration
if (!config.sessionSecret) {
  throw new Error('SESSION_SECRET is not configured.');
}

if (config.isProduction) {
  app.set('trust proxy', 1);
}

// Allow requests from the Angular frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.clientOrigin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: '100kb' }));

// Store sessions in MongoDB
app.use(session({
  name: 'happybirthday.sid',
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: Promise.resolve(mongoose.connection.getClient())
  }),
  cookie: {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'lax',
    maxAge: config.sessionMaxAge
  }
}));

// Original Travlr view configuration
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server/views'));

app.use(express.static(path.join(__dirname)));

const routes = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

app.use('/', routes);

// Database health check
app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    server: 'running',
    database: connected ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database unavailable. Start MongoDB and retry.'
    });
  }

  next();
}, apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.status
      ? err.message
      : 'Internal server error'
  });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
