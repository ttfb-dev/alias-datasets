import prs from './prs.js';
import { Event, eventBus, EVENTS } from './events.js';
import logger from './logger.js';
import userDatasetHandler from './userDatasetHandler.js';

const eventHandler = {
  process: async (event) => {
    switch (event._name) {
      case EVENTS.USER_PLAYS_GAME_HALLOWEEN_2021.name: 
        await prs.setUserParam(event.userId, 'halloween_2021_finish_game', true);
        await processor.halloween21EventCheck(event.userId);
        break;

      case EVENTS.USER_POST_REVIEW_HALLOWEEN_2021.name: 
        await prs.setUserParam(event.userId, 'halloween_2021_post_review', true);
        await processor.halloween21EventCheck(event.userId);
        break;
      
      default:
        await logger.critical('got unknown event', event);
        break;
    }
  },
}

const processor = {
  halloween21EventCheck: async (userId) => {
    const halloweenDatastId = 13;
    const finishGame = await prs.getUserParam(userId, 'halloween_2021_finish_game', false);
    const postReview = await prs.getUserParam(userId, 'halloween_2021_post_review', false);
    const eventDone  = await prs.getUserParam(userId, 'halloween_2021_event_done',  false);
    if (finishGame && postReview && !eventDone) {
      await prs.setUserParam(userId, 'halloween_2021_event_done',  true);
      await userDatasetHandler.addFixed(userId, halloweenDatastId);
      const event = new Event(EVENTS.USER_COMPLETE_EVENT_HALLOWEEN_2021);
      eventBus.newEvent(event, {userId});
    }
  }
}

export default eventHandler;
