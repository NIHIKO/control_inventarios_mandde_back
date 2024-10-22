"use strict";
const { createLogger, format, transports } = require('winston');
const path = require('path');
// Configuración del logger
const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.printf((timestamp, level, message) => `${timestamp} [${level.toUpperCase()}]: ${message}`)),
    transports: [
        new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, '../../logs/app.log') }),
    ],
});
// Logger de consola para desarrollo
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(format.colorize(), format.printf((timestamp, level, message) => `${timestamp} [${level}]: ${message}`))
    }));
}
module.exports = logger;
