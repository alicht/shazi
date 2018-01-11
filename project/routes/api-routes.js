const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/api-controller.js');


apiRouter.get('/', apiController.index);
apiRouter.get('/search', apiController.search);
apiRouter.post('/search', apiController.search)
apiRouter.get('/meals', apiController.searchById);
apiRouter.post('/meals', apiController.searchById);
// apiRouter.get('/new', apiController.searchById);
// apiRouter.get('/new/:id', apiController.edit);
apiRouter.post('/', apiController.update);


module.exports = apiRouter;

