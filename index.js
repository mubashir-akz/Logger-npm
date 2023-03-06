"use strict";
exports.__esModule = true;
exports.Loggers = exports.LogLevel = void 0;
var fs = require("fs");
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["CRITICAL"] = "CRITICAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Loggers = /** @class */ (function () {
    function Loggers(path, options) {
        if (options === void 0) { options = {}; }
        this.filename = 'log';
        this.newLogDaily = false;
        this.path = path;
        this.level = options.level || '';
        var today = new Date().toLocaleDateString();
        this.fileDate = today;
        this.filename = options.filename || 'log';
        this.newLogDaily = options.newLogDaily || false;
        this.file = "".concat(this.filename.toLowerCase(), "_").concat(this.level.toLowerCase(), "_").concat(today === null || today === void 0 ? void 0 : today.replace(/\//g, '-'), ".log");
        try {
            if (!fs.existsSync(this.path)) {
                fs.mkdirSync(this.path, { recursive: true });
            }
            this.rotateLogs(); // check for rotation when creating logger
        }
        catch (error) {
            console.error("Error creating log directory: ".concat(error));
        }
    }
    // check if current date is different from date of last log entry, and if so, rotate logs
    Loggers.prototype.rotateLogs = function () {
        try {
            var today = new Date().toLocaleDateString();
            if (today !== this.fileDate && this.newLogDaily) {
                // set new log file with today's date in filename
                this.file = "".concat(this.filename.toLowerCase(), "_").concat(this.level.toLowerCase(), "_").concat(today === null || today === void 0 ? void 0 : today.replace(/\//g, '-'), ".log");
                this.fileDate = today;
                // create new log file
                var time = new Date().toLocaleString();
                fs.writeFileSync("".concat(this.path, "/").concat(this.file), "Log created at ".concat(time, "\n"));
            }
        }
        catch (error) {
            console.error("Error rotating logs: ".concat(error));
        }
    };
    Loggers.prototype.writeLog = function (level, message) {
        try {
            var time = new Date().toLocaleString();
            var log = "".concat(time, " [").concat(level, "] ").concat(message, "\n");
            this.rotateLogs(); // check for rotation before writing log entry
            fs.appendFileSync("".concat(this.path, "/").concat(this.file), log);
        }
        catch (error) {
            console.error("Error writing log entry: ".concat(error));
        }
    };
    Loggers.prototype.debug = function (message) {
        this.writeLog(LogLevel.DEBUG, message);
    };
    Loggers.prototype.info = function (message) {
        this.writeLog(LogLevel.INFO, message);
    };
    Loggers.prototype.warning = function (message) {
        this.writeLog(LogLevel.WARNING, message);
    };
    Loggers.prototype.error = function (message) {
        this.writeLog(LogLevel.ERROR, message);
    };
    Loggers.prototype.critical = function (message) {
        this.writeLog(LogLevel.CRITICAL, message);
    };
    return Loggers;
}());
exports.Loggers = Loggers;
