const express = require('express');
const db = require('../database/index.js');
const axios = require('axios');
// const bodyParser = require('body-parser');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  const username = req.body.username;

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  axios.get(`https://api.github.com/users/${username}/repos`)
  .then(function (response) {

    const listOfDocs = [];

    for (let i = 0; i < response.data.length; i++) {
      const doc = {
        id: response.data[i].id,
        name: response.data[i].name,
        handle: response.data[i].owner.login,
        url: response.data[i].owner.url,
        avatar_url: response.data[i].owner.avatar_url
      }

      listOfDocs.push(doc);
    }

    db.save(listOfDocs);

    res.status(201).send();
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  })



});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

