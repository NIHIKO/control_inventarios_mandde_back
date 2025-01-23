const { createLogger, format, transports } = require('winston');
const path = require('path');

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((timestamp: string, level: string, message: string) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../../logs/app.log') }),
  ],
});

// Logger de consola para desarrollo
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf((timestamp: string, level: string, message: string) => `${timestamp} [${level}]: ${message}`)
    )
  }));
}

