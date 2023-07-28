const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("express-async-errors");

const router = require("./router");
const errorHandler = require("./middleware/error.handler");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use(router);

app.use(errorHandler);

module.exports = app;
