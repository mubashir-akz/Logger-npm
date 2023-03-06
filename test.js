const { Loggers } = require('./index');

const logger = new Loggers('./logs',{
    filename: 'test',
    level: 'INFO',
    newLogDaily: true,
});

logger.debug('Debug message');
logger.info('Info message');
logger.warning('Warning message');
logger.error('Error message');
