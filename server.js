const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes'); // Assuming this is your routes file
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection'); // Assuming this is your Sequelize configuration

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); // Create handlebars instance with helpers

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000, // Session expires in 1 hour
    httpOnly: true, // Protect cookie from client-side scripting
    secure: false, // Set to true for HTTPS environments
    sameSite: 'strict'  // Mitigate CSRF attacks
  },
  resave: false, // Don't resave session if no changes
  saveUninitialized: true, // Save new sessions even if empty
  store: new SequelizeStore({ // Use Sequelize to store sessions
    db: sequelize
  })
};

app.use(session(sess)); // Apply session middleware

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes middleware (assuming it's defined correctly)
app.use(routes);

// Synchronize Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});