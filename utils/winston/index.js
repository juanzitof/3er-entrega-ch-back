import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const centerFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
	level: "info",
	format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), centerFormat),
	transports: [
		new transports.File({
			filename: "logs/error.log",
			level: "error",
		}),
		new transports.File({
			filename: "logs/warn.log",
			level: "warn",
		}),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(new transports.Console());
}