import express from 'express'
import bodyParser from 'body-parser'
import userDatasetHandler from './userDatasetHandler.js'
import gameDatasetHandler from './gameDatasetHandler.js'
import datasetHandler from './datasetHandler.js'
import logger from './logger.js'

const app = express()
const port = 80
app.use(bodyParser.json())

app.get('/room/:room_id/active', async (req, res) => {
  const roomId = req.params.room_id;
  try {
    const datasets = await gameDatasetHandler.getActive(roomId);
    res.status(200).json(datasets);
  } catch (e) {
      logger.critical(e.message, {method: `/room/${roomId}/active`})
      res.status(400).send();
  }
})

app.post('/room/:room_id/activate-dataset', async (req, res) => {
  const roomId = req.params.room_id;
  const datasetId = req.body.datasetId;
  try {
    const datasets = await gameDatasetHandler.activate(roomId, datasetId);
    res.status(200).json(datasets);
  } catch (e) {
      logger.critical(e.message, {method: `/room/${roomId}/activate-dataset`})
      res.status(400).send();
  }
})

app.post('/room/:room_id/deactivate-dataset', async (req, res) => {
  const roomId = req.params.room_id;
  const datasetId = req.body.datasetId;
  try {
    const datasets = await gameDatasetHandler.deactivate(roomId, datasetId);
    res.status(200).json(datasets);
  } catch (e) {
      logger.critical(e.message, {method: `/room/${roomId}/deactivate-dataset`})
      res.status(400).send();
  }
})

app.get('/datasets', async (req, res) => {
  try {
    const datasets = await datasetHandler.getList();
    res.status(200).json(datasets);
  } catch (e) {
      logger.critical(e.message, {method: '/datasets'})
      res.status(400).send();
  }
})

app.get('/datasets/type/game', async (req, res) => {
  try {
    const datasets = await datasetHandler.getGameList();
    res.status(200).json(datasets);
  } catch (e) {
      logger.critical(e.message, {method: '/datasets/type/game'})
      res.status(400).send();
  }
})

app.get('/datasets/:dataset_id', async (req, res) => {
  const datasetId = req.params.dataset_id;
  try {
    const dataset = await datasetHandler.getById(datasetId);
    if (dataset) {
      res.status(200).json(dataset);
      return ;
    }
    logger.critical('Call to unknown dataset', {method: `/datasets/${datasetId}`})
    res.status(404).send();
  } catch (e) {
      logger.critical(e.message, {method: `/datasets/${datasetId}`})
      res.status(400).send();
  }
})

app.get('/datasets/:dataset_id/words', async (req, res) => {
  const datasetId = req.params.dataset_id;
  try {
    const words = await datasetHandler.getWords(datasetId);
    if (words) {
      res.status(200).json(words);
      return ;
    }
    logger.critical('Words not found', {method: `/datasets/${datasetId}/words`})
    res.status(404).send();
  } catch (e) {
      logger.critical(e.message, {method: `/datasets/${datasetId}/words`})
      res.status(400).send();
  }
})

app.post('/datasets/:dataset_id/words', async (req, res) => {
  const datasetId = req.params.dataset_id;
  const words = req.body.words;
  try {
    await datasetHandler.setWords(datasetId, words);
    res.status(200).send();
  } catch (e) {
      logger.critical(e.message, {method: `/datasets/${datasetId}/words`})
      res.status(400).send();
  }
})

app.post('/user/:user_id/activate-dataset', async (req, res) => {
    const userId = req.params.user_id;
    const datasetId = req.body.datasetId
    try {
        const datasets = await userDatasetHandler.activate(userId, datasetId);
        res.status(200).json(datasets);
    } catch (e) {
        logger.critical(e.message, {method: `/user/${user}/activate-dataset`, userId, datasetId})
        res.status(400).send();
    }
})

app.post('/user/:user_id/deactivate-dataset', async (req, res) => {
    const userId = req.params.user_id;
    const datasetId = req.body.datasetId;
    try {
        const datasets = await userDatasetHandler.deactivate(userId, datasetId);
        res.status(200).json(datasets);
    } catch (e) {
        logger.critical(e.message, {method: `/user/${user}/deactivate-dataset`, userId, datasetId})
        res.status(400).send();
    }
})

app.get('/user/:user_id/active', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const datasets = await userDatasetHandler.getActive(userId);
        res.status(200).json(datasets);
    } catch (e) {
        logger.critical(e.message, {method: `/user/${user}/activate`, userId})
        res.status(400).send();
    }
})

app.get('/', async (req, res) => {
    res.status(200).send();
})

app.listen(port)
