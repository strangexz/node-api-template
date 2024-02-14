const { existsSync, mkdirSync } = require('fs');
const { join, sep } = require('path');
const momentTimezone = require('moment-timezone');
const { createLogger, format, transports } = require('winston');
const { get } = require('express-http-context');

require('winston-daily-rotate-file');
const enviroments = require('./enviroments');

const level = enviroments.logLevel;
const timezoneConfigured = momentTimezone().tz(enviroments.timezone);
const myTimestamp = timezoneConfigured.format().slice(0, 19).replace('T', ' ');

const getLabel = function (modulePath) {
  const parts = modulePath.filename.split(sep);
  return join(parts[parts.length - 2], parts.pop());
};

/* Mostrando el nivel del log */
console.info(`${myTimestamp} - Configurando Logger global [${level}] [Winston]`);

/* Exportando Logger como función */
module.exports = function (callingModule) {
  let logger;

  /* Crea el directorio de logs si no existiera */
  if (!existsSync(enviroments.logPath)) {
    mkdirSync(enviroments.logPath);
  }

  const errorLog = join(enviroments.logPath, 'error.log');
  const appLog = join(enviroments.logPath, 'app.log');

  /* Definiendo el formato del log */
  let formatParams = (info) => {
    const { timestamp, level, message, ...args } = info;
    let label = getLabel(callingModule);

    let reqId = get('reqId');
    let msg = `${myTimestamp} ${level} [${label}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, '', '') : ''
    }`;

    let msgUID = `${myTimestamp} ${level} [${label}]-[${reqId}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, '', '') : ''
    }`;

    return reqId ? msgUID : msg;
    // return msg;
  };

  /* Asignando configuraciones de formato de acuerdo al ambiente */
  const localFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams),
  );

  const developmentFormat = format.combine(format.timestamp(), format.align(), format.printf(formatParams));
  const staggingFormat = format.combine(format.timestamp(), format.align(), format.printf(formatParams));
  const productionFormat = format.combine(format.timestamp(), format.align(), format.printf(formatParams));

  switch (enviroments.env) {
    case 'local':
      logger = createLogger({
        level: level,
        format: localFormat,
        transports: [new transports.Console()],
      });
      break;
    case 'development':
      logger = createLogger({
        level: level,
        format: developmentFormat,
        transports: [
          new transports.Console(),
          new transports.File({ filename: errorLog, level: 'error' }),
          new transports.File({ filename: appLog }),
        ],
      });
      break;
    case 'stagging':
      logger = createLogger({
        level: level,
        format: staggingFormat,
        transports: [
          new transports.Console(),
          new transports.File({ filename: errorLog, level: 'error' }),
          new transports.File({ filename: appLog }),
        ],
      });
      break;
    case 'production':
      logger = createLogger({
        level: level,
        format: productionFormat,
        transports: [
          new transports.Console(),
          new transports.File({ filename: errorLog, level: 'error' }),
          new transports.File({ filename: appLog }),
        ],
      });
      break;
    default:
      break;
  }

  logger.error('Error Logger configured');
  logger.warn('Warn Logger configured');
  logger.info('Info Logger configured');
  logger.debug('Debug Logger configured');
  logger.verbose('Verbose Logger configured');
  logger.silly('Silly Logger configured');
  console.info(`${myTimestamp} - Logger global configurado`);
  console.log();

  return logger;
};
