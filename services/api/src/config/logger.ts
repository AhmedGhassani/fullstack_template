import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

// Define a custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/info.log' }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log' }),
  ],
});

class Logger {
  public info(message: string): void {
    infoLogger.info(message);
  }

  public error(message: string): void {
    errorLogger.error(message);
  }
}

export const logger = new Logger();
