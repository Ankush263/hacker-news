const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./middlewares/global-error');
const router = require('./routes/index');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/v1', router);

app.use(globalErrorHandler);

module.exports = app;
