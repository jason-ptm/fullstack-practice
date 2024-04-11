const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`App running in port ${port}`);
});

module.exports = app;
