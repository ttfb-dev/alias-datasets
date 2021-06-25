import prs from './prs.js';

const datasetsCache = [];

const datasetHandler = {
  getList: async () => {
    return (await prs.getAppParam('word_datasets', []))
      .filter(dataset => dataset.type !== 'unavailable')
      .map(datasetHandler.mapGameDataset);
  },

  getById: async (datasetId) => {
    return (await datasetHandler.getList())
      .find(dataset => dataset.datasetId === datasetId);
  },

  getGameList: async () => {
    return (await datasetHandler.getList())
      .filter((dataset) => dataset.type === 'game');
  },

  getWords: async (datasetId) => {
    const key = `word_dataset_${datasetId}`;
    if (datasetsCache[key]) {
      return datasetsCache[key];
    }
    const wordsString = await prs.getAppParam(key);
    const wordsArray = wordsString.split(',');
    datasetsCache[key] = wordsArray;
    return wordsArray;
  },

  setWords: async (datasetId, wordsArray) => {
    const key = `word_dataset_${datasetId}`;
    if (datasetsCache[key]) {
      delete datasetsCache[key];
    }
    wordsString = wordsArray.join(',');
    await prs.setAppParam(key, wordsString);
  },

  mapGameDataset(dataset) {
    delete dataset.src;
    return dataset;
  },
}

export default datasetHandler;
