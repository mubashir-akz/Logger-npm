const { Loggers } = require('../index');

const logger = new Loggers('./logs',{
    filename: 'test',
    level: 'INFO',
    newLogDaily: true,
    maxLogSize: 1000000, // 1MB
});

logger.debug('Debug message');
logger.info('Info message');
logger.warning('Warning message');
logger.error('Error message');
