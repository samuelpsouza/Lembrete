const winston = require('winston');

module.exports = () => {
  const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        json: true,
        colorize: true
      })
    ]
  });

  return logger;
};
