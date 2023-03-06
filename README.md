# Node-Logger-Npm

A simple logger class for writing log messages to a file in Node.js.


# Installation
You can install the package using npm:

```sh 
npm install node-logger-npm
```

# Usage 
To use the logger, you first need to import it:

``` javascript
import { Loggers, LogLevel } from 'loggers'; 
```

Next, create a new instance of the Logger class:
``` javascript
const logger = new Loggers('./logs',{
    filename: 'test',
    level: 'INFO',
    newLogDaily: true,
});
```

The first parameter is the path to the directory where the log files will be saved. 
The second parameter is an optional options object that can contain a log level (default is DEBUG) and a filename.


To write a log message, simply call the appropriate log-level method:

```javascript
logger.debug('Debug message');
logger.info('Info message');
logger.warning('Warning message');
logger.error('Error message');
logger.critical('Critical message');
```

The log message will be written to a file in the specified directory with a filename based on the current date.

# LogLevel
An enum is representing the log levels. The possible values are:

``` 
DEBUG
INFO
WARNING
ERROR
CRITICAL
```

# LoggerOptions
An interface representing the logger options. It can contain:

`level` - The log level to use. 
`filename` - The filename to use for the log file.

# License
This package is licensed under the MIT License.