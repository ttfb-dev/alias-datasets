import { Logger } from '@ttfb/aliasgame';
const host = process.env.LOGGER_HOST;
const logger = new Logger(host, 'datasets');

export default logger;
