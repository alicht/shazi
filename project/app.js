const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const override = require('method-override');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const axios = require('axios');


app.use(morgan('dev'));
app.use(override('_method'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));


app.listen(PORT, () => {
  console.log(`App is upp and running. Listening on port ${PORT}`)
});

//set up passport local
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// allows user to bounce user auth info between all requests,
// so user need not resign every new page.
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

//set up passport local
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
   axios({
    method: 'get',
    url: `http://www.themealdb.com/api/json/v1/1/latest.php`
    })
   .then(data => {
    console.log(data.data.meals[0].strMeal)
    res.render('index', {
      message: 'this is message',
      data: data
    })
  })
});

const authRouter = require('./routes/auth-routes');
app.use('/auth', authRouter);

const authHelpers = require('./services/auth/auth-helpers');
app.use(authHelpers.loginRequired)

const apiRouter = require('./routes/api-routes');
app.use('/browse', apiRouter);

const recipeRouter = require('./routes/recipes-routes');
app.use('/recipes', recipeRouter);



app.get('*', (req, res) => {
  res.status(404).send("This isn't working");
})

// create/initalize ROUTES next and link it to routes folder, routes file.

// next initialize a controller folder with controller files that will handle
// all routes requests

// afterwards prep for a views folder so routes will
// render something on the browser.
