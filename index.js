/**
 * Modules Imports
 */
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");

/**
 * Library imports
 */

const ErrorHandler = require("./lib/ErrorHandler");
const AppError = require("./lib/AppError");
const DBConfig = require("./lib/DBConfig");
const { inDB } = require("./lib/localCache");

// Express App
const app = express();
dotenv.config();
DBConfig();

app.use(cors());
app.options("*", cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
}

/**
 * Api Routes
 */
app.get("/api/app/conf/node_env", (req, res) => {
  res.status(200).json({ status: "OK", data: process.env.NODE_ENV });
});
app.get("/api/app/conf/", (req, res) => {
  const { key } = req.query;
  const value = inDB.get(key);
  if (value !== null || value !== undefined) {
    res.status(200).json({ status: "OK", value });
  }
});

app.get("/api/app/test/:address/:signature", (req, res) => {
  console.log(req.params)
  res.json({ status: "OK" });
});

/**
 * Undefined Routes
 */
app.all("*", (req, res, next) => {
  if (req.method === "GET" && process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  }
  next(new AppError(`URL: "${req.originalUrl}" cannot be found`, 404));
});

app.use(ErrorHandler);

/**
 * Server Definition
 */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "server has started on:  " +
        `${process.env.NODE_ENV}`.yellow.bold +
        " mode"
    );
  } else {
    console.log(
      "server has started on:  " +
        `${process.env.NODE_ENV}`.green.bold +
        " mode"
    );
  }
  console.log(`url: ` + `http://localhost:${port}`.yellow);
});
