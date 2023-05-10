"use strict";

/** shopping cart app */

const express = require("express");
const { NotFoundError } = require("./expressError");
const app = express();

const itemsRoutes = require("./itemsRoutes");

app.use(express.json()); // using JSON

app.use("/items", itemsRoutes); // prefixed routes to "/items"


// ERRORS:

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;