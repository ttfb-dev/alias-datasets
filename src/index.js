import express from 'express'
import bodyParser from 'body-parser'
import userDatasetHandler from './userDatasetHandler.js'
import logger from './logger.js'

const app = express()
const port = 80
app.use(bodyParser.json())

app.post('/user/:user_id/activate-dataset', async (req, res) => {
    const userId = req.params.user_id;
    const datasetId = req.body.datasetId
    try {
        const datasets = await userDatasetHandler.activate(userId, datasetId);
        res.status(200).json(datasets);
    } catch (e) {
        logger.critical('Activate dataset failed', {method: '/user/activate-dataset', userId, datasetId})
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
        logger.critical('Deactivate dataset failed', {method: '/user/deactivate-dataset', userId, datasetId})
        res.status(400).send();
    }
})

app.post('/user/:user_id/active', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const datasets = await userDatasetHandler.getActive(userId, datasetId);
        res.status(200).json(datasets);
    } catch (e) {
        logger.critical('Get activate dataset failed', {method: '/user/activate', userId})
        res.status(400).send();
    }
})

app.get('/', async (req, res) => {
    res.status(200).send();
})

app.listen(port)
