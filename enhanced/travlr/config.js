
const config = {
  port: Number(process.env.PORT) || 3000,

  clientOrigin:
    process.env.CLIENT_ORIGIN || 'http://localhost:4200',

  // Secret used to sign session cookies
  sessionSecret: process.env.SESSION_SECRET,

  // Sessions will last for 24 hours
  sessionMaxAge: 24 * 60 * 60 * 1000,

  // Production uses HTTPS
  isProduction: process.env.NODE_ENV === 'production'
};

module.exports = config;
