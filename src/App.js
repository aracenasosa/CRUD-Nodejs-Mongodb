const express = require('express');
const chalk = require('chalk');
const path = require('path');
const morgan = require('morgan');
const indexRoutes = require('./routes/Index');
const mongoose = require('mongoose');

const app = express();

// Connecting to db
mongoose.connect('mongodb://localhost/crud-mongo')
.then(db => console.log('DB Connected'))
.catch(err => console.log('Hubo un error'));

//Config
app.set('port', process.env.Port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Importing Routes


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', indexRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${chalk.green(app.get('port'))}`);
});