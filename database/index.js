const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const controllers = require('./dbMethods.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log(`We're connected!`);
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // we want an id, name, handle, url [, maybe avatar_url]
  id: Number,
  name: String,
  handle: String,
  url: String,
  avatar_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (listOfDocs) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // can use insertMany() to save multiple docs of Model to DB. Need list of docs in an array
  // var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
  // Movies.insertMany(arr, function(error, docs) {});

  Repo.insertMany(listOfDocs, function (err, docs) {
    if (err) {
      return console.error(err)
    } else {
      return `Pushed Repo ${Repo} to our MongoDB fetcher!`
    }
  });

}

module.exports.save = save;