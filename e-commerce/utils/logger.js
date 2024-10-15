import path from "path";
import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ level, message }) => {
            const timestamp = new Date().toISOString();
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});

export const createLog = (logName, logDirectory = "") => {
    // checkDirExists();
    const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "_");
    const logFilename = `${logName}_${currentDate}.log`;
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.printf(({ level, message }) => {
                const timestamp = new Date().toISOString();
                return `${timestamp} ${level}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console({
                stderrLevels: ["info", "error"],
            }),
            new winston.transports.File({
                filename: path.resolve(
                    __dirname,
                    "logs",
                    logDirectory,
                    `${logFilename}`
                ),
                datePattern: "YYYY_MM_DD",
                level: "error",
            }),
            new winston.transports.File({
                filename: path.resolve(
                    __dirname,
                    "logs",
                    logDirectory,
                    `${logFilename}`
                ),
                datePattern: "YYYY_MM_DD",
                level: "info",
            }),
        ],
    });
    return logger;
};

/**
 * If not exist then it create a directory.
 */
const checkDirExists = () => {
    const logsDir = path.join("logs");
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
};
