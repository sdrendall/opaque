const winston = require('winston')

/*
exports.log = (msg) => {
    const str = `${new Date()} :: ${msg}`
    console.log(msg)
}


exports.error = (error, req) => {
    if (req) {
        this.log(`Error on ${req.method} request to ${req.url}`)
    }
    console.log(error)
}
*/

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

exports.log = message => {
    logger.log({
        level: 'info',
        message
    })
}

exports.error = message => {
    logger.log({
        level: 'error',
        message
    })
}
