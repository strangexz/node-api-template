const envFound = require('dotenv').config();

if (envFound.error) {
  // This error should crash whole process
  throw new Error('⚠️  Could not find .env file  ⚠️');
}

/* Cargando variables de entorno */
const env = process.env.NODE_ENV || 'local';
/* Parámetros de logs */
const logLevel = process.env.LOG_LEVEL;
const logPath = process.env.LOG_PATH;
/* Parámetros Miscelaneos */
const timezone = process.env.TIMEZONE;
const hostname = process.env.HOSTNAME;
/* Parámetros de base de datos */
const dbHost = process.env.DB_USER;
const dbName = process.env.DB_PASS;
const dbUser = process.env.DB_HOST;
const dbPass = process.env.DB_PORT;
const dbPort = process.env.DB_NAME;
/* Prámetros de seguridad */
const jwtSeed = process.env.JWT_SEED;

module.exports = {
  env,
  logLevel,
  logPath,
  timezone,
  hostname,
  dbHost,
  dbName,
  dbUser,
  dbPass,
  dbPort,
  jwtSeed,
};
