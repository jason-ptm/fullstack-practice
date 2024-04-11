const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const { ormErrorHandler, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");
const { config } = require("./config/config");

const app = express();
const port = config.port;

const whitelist = ["http://localhost:8080"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};

app.use(cors(options));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

routerApi(app);

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running in port ${port}`);
});

module.exports = app;
