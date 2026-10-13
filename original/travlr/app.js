const express = require('express');
const path = require('path');
const hbs = require('hbs');
const config = require('./config');
require('./app_server/models/db');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.clientOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});
app.use(express.json({ limit: '100kb' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server/views'));
app.use(express.static(path.join(__dirname)));
const routes = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');
app.use('/', routes);
app.use('/api', apiRoutes);
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.status ? err.message : 'Internal server error' });
});
app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
