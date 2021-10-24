import prs from './prs.js';

const userDatasetHandler = {
  activate: async (userId, datasetId) => {
    const activeDatasetIds = await userDatasetHandler.getActive(userId);
    activeDatasetIds.push(datasetId);
    await prs.setUserParam(userId, 'activated_dataset_ids', activeDatasetIds);
    return activeDatasetIds;
  },
  
  deactivate: async (userId, datasetId) => {
    const activeDatasetIds = await userDatasetHandler.getActive(userId);
    const newActiveDatasets = activeDatasetIds.filter(
      (activeDatasetId) => activeDatasetId !== datasetId,
    );
    await prs.setUserParam(userId, 'activated_dataset_ids', newActiveDatasets);
    return newActiveDatasets;
  },

  addFixed: async (userId, datasetId) => {
    const fixedDatasetIds = await userDatasetHandler.getFixed(userId);
    fixedDatasetIds.push(datasetId);
    await prs.setUserParam(userId, 'fixed_dataset_ids', fixedDatasetIds);
  },

  getFixed: async (userId) => {
    await prs.getUserParam(userId, 'fixed_dataset_ids', []);
  },

  getActive: async (userId) => {
    let datasets = await prs.getUserParam(userId, 'activated_dataset_ids', null);
    if (datasets === null) {
      datasets = [3];
      await prs.setUserParam(userId, 'activated_dataset_ids', datasets)
    }
    return datasets;
  },
}

export default userDatasetHandler;
