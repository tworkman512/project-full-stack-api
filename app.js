const { MONGO_DB_CONNECTION, NODE_ENV, PORT } = process.env;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Database Connection
mongoose.connect(MONGO_DB_CONNECTION, { useNewUrlParser: true });

// Application-level Middleware
if (NODE_ENV === "development") app.use(require("morgan")("dev"));
app.use(require("body-parser").json());

// Routes
app.use("/api/v1/units", require("./api/routes/units"));
app.use("/api/v1/employees", require("./api/routes/employees"));
app.use("/api/v1/companies", require("./api/routes/companies"));

// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`);
  error.status = 404;
  next(error);
});

// Error Handler
app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status).json({ status, message });
});

// Open Connection
const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
