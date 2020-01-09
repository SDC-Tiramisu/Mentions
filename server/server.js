const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/index.js');
const Model = require('./database/model.js');

//basic server prep
const app = express();
const port = 3003;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

//specialized routes
//old route
app.get('/api/articles/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Model.read(restId)
    .then((result) => {
      res.send(result.rows[0]);
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error finding restaurant in database: ", err);
    })
})

//Create route - test! Accepts { title: string, articles: [numbers]}
app.post('/api/articles/create/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  let body = req.body;
  // console.log("Restaurant ID: ", restId);
  Model.create(restId, body)
    .then((doc) => {
      res.statusCode = 201;
      res.end();
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error creating restaurant in database: ", err);
    })
})

//Read route - tested!
app.get('/api/articles/read/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Model.read(restId)
    .then((result) => {
      res.send(result.rows[0]);
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error finding restaurant in database: ", err);
    })
})

//Update  - tested! Give it a body with { article: number }
app.patch('/api/articles/update/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  let body = req.body;
  // console.log("Restaurant ID: ", restId);
  Model.update(restId, body.article)
    .then((doc) => {
      res.statusCode = 201;
      res.end();
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error updating restaurant in database: ", err);
    })
})

//Delete - tested!
app.delete('/api/articles/delete/:restaurantID', (req, res) => {
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