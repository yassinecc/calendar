const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: ' http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

require('./server/routes')(app);
app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Hello!',
  })
);

module.exports = app;
