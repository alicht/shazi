const axios = require('axios');
const db = require('../db/config');
const Recipes = require('../models/recipes.js');

const apiController = {};


apiController.index = (req, res) => {
  console.log('Going through the API controller')
  axios({
    method: 'get',
    url: `http://www.themealdb.com/api/json/v1/1/list.php?c=list`
  })
  .then(data => {

    res.render('browse/browse', {
      status: 200,
      message: 'OK!',
      data: data.data.meals
    })
  }).catch( (err) => {
    res.status(500).json(err)
  })
};


apiController.search = (req, res) => {
  // console.log('inside search method')
  // console.log(req.body.category)
  axios({
    method: 'get',
    url: `http://www.themealdb.com/api/json/v1/1/filter.php?c=${req.body.category}`
  })
  .then( data => {
    console.log('got this back', data.data.meals)
    res.render('browse/search', {
      data: data.data.meals
    })
  })
  .catch( err => {
    res.status(500).json(err)
  })
}


apiController.searchById = (req, res) => {
  console.log('inside search by Id method')
  console.log(req.body.idMeal)
  axios({
    method: 'get',
    url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.body.idMeal}`
  })
  .then( data => {
    console.log('got this back', data.data.meals)
    res.render('browse/meals', {
      data: data.data.meals
    })
  })
  .catch( err => {
    res.status(500).json(err)
  })
}


apiController.edit = (req,res) => {
    axios({
      method: 'get',
      url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.body.idMeal}`
    })
    .then(data => {
    res.render('recipes/edit', {data: data.data.meals})
    })
    .catch(err => {
      res.status(400).json(err);
    });
  };


apiController.update = (req, res) => {
  console.log("This data is being uploaded")
  // axios({
  //   method: 'get',
  //   url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.body.idMeal}`
  // })
  Recipes.create({
    recipe : req.body.recipe,
    category: req.body.category,
    area: req.body.area,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    measurement: req.body.measurement,
    img: req.body.img,
    tag: req.body.tag
  })
  .then(() => {
    res.redirect(`/recipes`)
  })
  .catch(err => {
    res.status(400).json(err)
  });
};


module.exports = apiController;
