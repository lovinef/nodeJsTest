var winston = require('winston');
const fs = require('fs');
const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

var logger = winston.createLogger({
    transports: [
      new (winston.transports.Console)({
       timestamp: tsFormat,
       colorize: true,
       level: process.env.log_level
     }),
      new (require('winston-daily-rotate-file'))({
        level: process.env.log_level,
        filename: `${logDir}/${process.env.log_file_name}`,
        timestamp: tsFormat,
        datePattern: 'YYYY-MM-DD',
        prepend: true,
      })
    ]
  });

  module.exports = logger;
