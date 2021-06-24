import prs from './prs.js';

const gameDatasetHandler = {
  activate: async (roomId, datasetId) => {
    const activeGameDatasetIds = await gameDatasetHandler.getActive(roomId);
    activeGameDatasetIds.push(datasetId);
    await gameDatasetHandler.setActive(roomId, activeGameDatasetIds);
    return activeGameDatasetIds;
  },
  
  deactivate: async (roomId, datasetId) => {
    const activeGameDatasetIds = await gameDatasetHandler.getActive(roomId);
    const filteredActiveGameDatasetIds = activeGameDatasetIds.filter(
      (id) => id !== datasetId,
    );
    await gameDatasetHandler.setActive(roomId, filteredActiveGameDatasetIds);
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
