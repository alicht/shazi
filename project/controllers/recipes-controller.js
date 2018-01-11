const Recipes = require('../models/recipes.js');
const axios = require('axios');

const recipesController = {};


recipesController.index = (req,res) => {
  console.log('Going through recipes controller')
  Recipes.findAll()
    .then(recipes => {
      res.render('recipes/index', {
        message:'ok',
        recipes:recipes
      })
    })
}


recipesController.show = (req, res) => {
  Recipes.findById(req.params.id)
  .then(recipes => {
    console.log('this is working')
    res.render('recipes/show', {
      recipes: recipes
    })
  })
  .catch(err => {
    res.status(400).json(err);
  })
}

recipesController.new = (req, res) => {
   res.render('recipes/new', {})
};

recipesController.create = (req, res) => {
  Recipes.create({
      recipe : req.body.recipe,
      category: req.body.category,
      area: req.body.area,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      measurement: req.body.measurement,
      img: req.body.img,
      tag: req.body.tag,
    })
    .then(recipes => {
      res.redirect(`/recipes`)
    })
    .catch(err => {
      res.status(400).json(err);
    })
};

recipesController.edit = (req,res) => {
  Recipes.findById(req.params.id)
    .then(recipes => {
    res.render('recipes/edit', {recipes: recipes})
    })
    .catch(err => {
      res.status(400).json(err);
    });
  };

recipesController.update = (req, res) => {
  Recipes.update({
    recipe : req.body.recipe,
    category: req.body.category,
    area: req.body.area,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    measurement: req.body.measurement,
    img: req.body.img,
    tag: req.body.tag
  }, req.params.id)
  .then(() => {
    res.redirect(`/recipes/${req.params.id}`)
  })
  .catch(err => {
    res.status(400).json(err)
  });
};
// ${req.params.id}

recipesController.delete = (req, res) => {
  Recipes.delete(req.params.id)
    .then(() => {
      res.redirect('/recipes')
    })
    .catch(err => {
      res.status(400).json(err);
    });
};


module.exports = recipesController;
