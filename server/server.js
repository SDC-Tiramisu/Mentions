const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');
const model = require('./database/model.js');

//basic server prep
const app = express();
const port = 3003;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

//specialized routes
//old route
app.get('/api/restaurants/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Model.read(restId)
    .then((doc) => {
      res.send(doc);
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error finding restaurant in database: ", err);
    })
})

//Create route
app.post('/api/restaurants/create/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Model.create(restId)
    .then((doc) => {
      res.statusCode = 201;
      res.end();
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error creating restaurant in database: ", err);
    })
})

//Read route
app.get('/api/restaurants/read/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Model.get(restId)
    .then((doc) => {
      res.send(doc);
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error finding restaurant in database: ", err);
    })
})

//Update route
app.patch('/api/restaurants/update/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  let body = req.body;
  // console.log("Restaurant ID: ", restId);
  Model.update(restId, body)
    .then((doc) => {
      res.statusCode = 201;
      res.end();
      // console.log(doc);
    })
    .catch((err) => {∂
      console.log("Error updating restaurant in database: ", err);
    })
})

app.delete('/api/restaurants/delete/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Model.delete(restId)
    .then((doc) => {
      res.statusCode = 201;
      res.end();
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error deleting restaurant in database: ", err);
    })
})



//server start-up
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})