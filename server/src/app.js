const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());

module.exports = app;
