// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
// Routes and sql config
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Express app an dPORT
const app = express();
const PORT = process.env.PORT || 3001;
// session and cookie attributes
const sess = {
  secret: 'Super Secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// set up session
app.use(session(sess));

// Set Handlebars to run view
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
