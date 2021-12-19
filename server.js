require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const axios = require("axios");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://mesbaulalam:12345@cluster0.uxnlr.mongodb.net/weatherDB?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  temperature: Number,
  humidity: Number,
});

const Weather = mongoose.model("weatherData", weatherSchema);

app.use(express.json());

app.get("/weather", authToken, (req, res) => {
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=HongKong&appid=7ab4ea402b4c4a4908af92bb6fcf4d0c&units=metric"
    )
    .then((response) => {
      const data = new Weather({
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
      });

      Weather.collection.drop();

      data
        .save()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));
      res.json({
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
      });
    })
    .catch((err) => {
      Weather.find({}, (err, users) => {
        console.log({
          temperature: users.temperature,
          humidity: users.humidity,
        });
        res.json({
          temperature: users.temperature,
          humidity: users.humidity,
        });
      });
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, "" + process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(3000);
