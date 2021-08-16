'use strict';

const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());



// connect to Mongo daemon
mongoose
  .connect(
    'mongodb://mongo:27017/udemy-mongo',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('item', ItemSchema);

app.get('/items', (req, res, next) => {
  Item.find({})
    .then(
      (items) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        console.log("-------GET--items---- BEFORE Response")
        res.json(items);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

app.post('/items', (req, res, next) => {
  const data = req.body;
  console.log(" CREATE ITEM:", data);
  Item.create(data)
    .then(
      (article) => {
        console.log("ITEM Created ", article);
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.send(article);
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => {
      next(err);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);