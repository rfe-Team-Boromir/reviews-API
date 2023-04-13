const express = require("express");
const reviewsRoutes = require('./router.js')
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

//Middleware
app.use('/', reviewsRoutes)
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());






module.exports = app;