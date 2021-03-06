const winston = require("winston");

// helper
import * as constant from "../helpers/constant";
import logType from "../enum/logType";

class LoggingService {
	constructor() {
		this.DEBUG_LOGGING_ON = true;
		// You can use winston ro pino to store a logs using a transports for better visibility
		this.logger = winston.createLogger({
			levels: winston.config.npm.levels,
			level: logType.DEBUG,
			defaultMeta: { service: constant.config.SERVICE_NAME },
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
			transports: [
				//
				// - Write to all logs with level `info` and below to `combined.log` 
				// - Write all logs error (and below) to `error.log`.
				//
				// new logsene(constant.config.sematext.logger),
				new winston.transports.Console(),
				// new winston.transports.File({ filename: "error.log", level: "error" }),
				// new winston.transports.File({ filename: "combined.log" })
			]
		});
	}

	getWinstonLogger() {
		return this.logger;
	}

	consoleLog(title, message, error = null, level = logType.VERBOSE) {
		if (error || level == logType.ERROR || level == logType.WARNING) {
			this.consoleErrorLog(title, message, error);
		} else if (level == logType.VERBOSE || level == logType.INFO || level == logType.DEBUG) {
			this.consoleInfoLog(title, message);
		}
	}

	consoleErrorLog(title, message, error) {
		this.logger.error(title, [message, error]);

		// log on console
		// console.log("ERROR || WARNING :: ", `${title} ::: `, message, error);
	}

	consoleInfoLog(title, message) {
		// check if info logging enabled
		if (!this.DEBUG_LOGGING_ON) return;

		this.logger.debug(title, [message]);
		// log on console
		// console.log("DEBUG :: ", `${title} ::: `, message);
	}
}


const loggingService = new LoggingService();
export default loggingService;