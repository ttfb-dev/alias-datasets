import prs from './prs.js';
import logger from './logger';

const eventHandler = {
  process: async (event) => {
    switch (event._name) {
      default:
        await logger.critical('got unknown event', event);
        break;
    }
  },
}

export default eventHandler;
