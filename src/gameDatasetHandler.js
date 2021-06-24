import prs from './prs.js';

const gameDatasetHandler = {
  activate: async (roomId, datasetId) => {
    const activeGameDatasetIds = await userDatasetHandler.getActive(roomId);
    activeGameDatasetIds.push(datasetId);
    await userDatasetHandler.setActive(roomId, activeGameDatasetIds);
    return activeGameDatasetIds;
  },
  
  deactivate: async (roomId, datasetId) => {
    const activeGameDatasetIds = await userDatasetHandler.getActive(roomId);
    const filteredActiveGameDatasetIds = activeGameDatasetIds.filter(
      (id) => id !== datasetId,
    );
    await userDatasetHandler.setActive(roomId, filteredActiveGameDatasetIds);
    return filteredActiveGameDatasetIds;
  },

  getActive: async (roomId) => {
    return await prs.getRoomParam(roomId, 'active_game_dataset_ids', []);
  },

  setActive: async (roomId, datasetIds) => {
    return await prs.setRoomParam(roomId, 'active_game_dataset_ids', datasetIds);
  },
}

export default gameDatasetHandler;
