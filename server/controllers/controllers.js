const controller = {
  saveToDB: () => {
    // can use insertMany() to save multiple docs of Model to DB. Need list of docs in an array
    // var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
    // Movies.insertMany(arr, function(error, docs) {});

    const listOfDocs = [];

    for (let i = 0; i < data.length, i++) {
      const doc = {
        id: data[i].id,
        name: data[i].name,
        handle: data[i].owner.login,
        url: data[i].owner.url,
        avatar_url: data[i].owner.avatar_url
      }

      listOfDocs.push(doc);
    }

    Repo.insertMany(listOfDocs, function (err, docs) {
      if (err) {
        return console.error(err)
      } else {
        return `Pushed Repo ${Repo} to our MongoDB fetcher!`
      }
    });
  }
}