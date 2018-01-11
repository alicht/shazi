const express = require('express');
const recipesRouter = express.Router();
const recipesController = require('../controllers/recipes-controller.js');

recipesRouter.get('/', recipesController.index);
recipesRouter.get('/new', recipesController.new);
recipesRouter.get('/:id', recipesController.show);
recipesRouter.get('/:id/edit', recipesController.edit);
recipesRouter.put('/:id', recipesController.update);
recipesRouter.post('/', recipesController.create);
recipesRouter.delete('/:id', recipesController.delete);



module.exports = recipesRouter;
