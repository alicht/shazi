const db = require('../db/config');

const Recipes = {};

Recipes.findAll = () => {
  return db.query('SELECT * FROM recipes')
  console.log('this is working 123')
};

Recipes.findById= (id) => {
  return db.oneOrNone(`SELECT * FROM recipes where id = $1`, [id])
};

Recipes.create = (recipes) => {
  return db.one (
    `
    INSERT INTO recipes
    (recipe, category, area, instructions, ingredients, measurement, img, tag)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `,
    [recipes.recipe, recipes.category, recipes.area, recipes.instructions, recipes.ingredients, recipes.measurement, recipes.img, recipes.tag]
    );
};


Recipes.update = (recipes, id) => {
  return db.oneOrNone(`
    UPDATE recipes SET
    recipe = $1,
    category = $2,
    area = $3,
    instructions = $4,
    ingredients = $5,
    measurement = $6,
    img = $7,
    tag = $8
    WHERE id = $9
    `,[recipes.recipe, recipes.category, recipes.area, recipes.instructions, recipes.ingredients, recipes.measurement, recipes.img, recipes.tag, id])
};

Recipes.delete = (id) => {
  return db.none(`
    DELETE from recipes
    WHERE id=$1
    `,[id])
};

module.exports = Recipes
