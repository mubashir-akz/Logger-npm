"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loggers = exports.LogLevel = void 0;
const fs_1 = __importDefault(require("fs"));
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["CRITICAL"] = "CRITICAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Loggers {
    constructor(path, options = {}) {
        this.path = path;
        this.level = options.level || 'DEBUG';
        this.fileDate = '';
        this.file = options.filename || `${this.level.toLowerCase()}.log`;
        try {
            if (!fs_1.default.existsSync(this.path)) {
                fs_1.default.mkdirSync(this.path, { recursive: true });
            }
            this.rotateLogs(); // check for rotation when creating logger
        }
        catch (error) {
            console.error(`Error creating log directory: ${error}`);
        }
    }
    // check if current date is different from date of last log entry, and if so, rotate logs
    rotateLogs() {
        try {
            const today = new Date().toLocaleDateString();
            if (today !== this.fileDate) {
                // set new log file with today's date in filename
                this.file = `${this.level.toLowerCase()}_${today === null || today === void 0 ? void 0 : today.replace(/\//g, '-')}.log`;
                this.fileDate = today;
                // create new log file
                const time = new Date().toLocaleString();
                fs_1.default.writeFileSync(`${this.path}/${this.file}`, `Log created at ${time}\n`);
            }
        }
        catch (error) {
            console.error(`Error rotating logs: ${error}`);
        }
    }
    writeLog(level, message) {
        try {
            const time = new Date().toLocaleString();
            const log = `${time} [${level}] ${message}\n`;
            this.rotateLogs(); // check for rotation before writing log entry
            fs_1.default.appendFileSync(`${this.path}/${this.file}`, log);
        }
        catch (error) {
            console.error(`Error writing log entry: ${error}`);
        }
    }
    debug(message) {
        this.writeLog(LogLevel.DEBUG, message);
    }
    info(message) {
        this.writeLog(LogLevel.INFO, message);
    }
    warning(message) {
        this.writeLog(LogLevel.WARNING, message);
    }
    error(message) {
        this.writeLog(LogLevel.ERROR, message);
    }
    critical(message) {
        this.writeLog(LogLevel.CRITICAL, message);
    }
}
exports.Loggers = Loggers;
