import logger from './logger.js';
import prs from './prs.js';

const datasetsCache = [];

const datasetHandler = {
  getList: async () => {
    const datasets = await prs.getAppParam('word_datasets', [])
    logger.debug(datasets);
    return datasets.map(datasetHandler.mapGameDataset);
  },

  getById: async (datasetId) => {
    return await this.getList().find(dataset => dataset.datasetId === datasetId);
  },

  // setList: async (datasets) => {
  //   await prs.getAppParam('word_datasets', datasets)
  // },

  getGameList: async () => {
    const datasets = await datasetHandler.getList();
    return datasets
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
