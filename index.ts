import * as fs from 'fs';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL'
}

export interface LoggerOptions {
  level?: LogLevel;
  filename?: string;
  newLogDaily?: boolean;
  maxLogSize?: number;
}

export class Loggers {
  private readonly path: string;
  private readonly level: string;
  private fileDate: string; // keep track of date of last log entry
  private file: string;
  private readonly filename: string = 'log';
  private newLogDaily: boolean = false;
  private maxLogSize: number =  1000000; // 1MB
  
  constructor(path: string, options: LoggerOptions = {}) {
    this.path = path;
    this.level = options.level || '';
    const today = new Date().toLocaleDateString();
    this.fileDate = today;
    this.filename = options.filename || 'log';
    this.newLogDaily = options.newLogDaily || false;
    this.maxLogSize = options.maxLogSize || 1000000; // 1MB
    this.file = `${this.filename.toLowerCase()}_${this.level.toLowerCase()}_${today?.replace(/\//g, '-')}.log`;
  
    try {
      if (!fs.existsSync(this.path)) {
        fs.mkdirSync(this.path,{ recursive: true });
      }
  
      this.rotateLogs(); // check for rotation when creating logger
    } catch (error) {
      console.error(`Error creating log directory: ${error}`);
    }
  }
  
  // check if current date is different from date of last log entry, and if so, rotate logs
  private rotateLogs() {
    try {
      const today = new Date().toLocaleDateString();
      if ((today !== this.fileDate && this.newLogDaily) || (fs.statSync(`${this.path}/${this.file}`).size > this.maxLogSize && this.maxLogSize > 0)) {
        // set new log file with today's date in filename
        this.file = `${this.filename.toLowerCase()}_${this.level.toLowerCase()}_${today?.replace(/\//g, '-')}.log`;
        this.fileDate = today;
  
        // create new log file
        const time = new Date().toLocaleString();
        fs.writeFileSync(`${this.path}/${this.file}`, `Log created at ${time}\n`);
      }
    } catch (error) {
      console.error(`Error rotating logs: ${error}`);
    }
  }
  
  writeLog(level: LogLevel, message: string) {
    try {
      const time = new Date().toLocaleString();
      const log = `${time} [${level}] ${message}\n`;
  
      this.rotateLogs(); // check for rotation before writing log entry
      fs.appendFileSync(`${this.path}/${this.file}`, log);
    } catch (error) {
      console.error(`Error writing log entry: ${error}`);
    }
  }

  debug(message: string) {
    this.writeLog(LogLevel.DEBUG, message);
  }

  info(message: string) {
    this.writeLog(LogLevel.INFO, message);
  }

  warning(message: string) {
    this.writeLog(LogLevel.WARNING, message);
  }

  error(message: string) {
    this.writeLog(LogLevel.ERROR, message);
  }

  critical(message: string) {
    this.writeLog(LogLevel.CRITICAL, message);
  }
}
