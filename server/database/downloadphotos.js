//need to add to npm-modules/unsplash-js/lib/unsplash.js on the second line
//const fetch = require('node-fetch');

const { toJson } = require('unsplash-js');
const Unsplash = require('unsplash-js').default;
const fsPromises = require('fs').promises;
const settings = require('./downloadsettings');
const $ = require('jquery');

//for some reason the version I've made with jquery here doesn't work at all. The previous version using axios.get only made 15 byte files though....
const script = async function () {
  const unsplash = new Unsplash(settings);
  for (let i = 1; i<41; i++) {
    await unsplash.search.photos('writing', i, 25)
      .then(toJson)
      .then(json => {
        console.log(json);
        json.results.map((result) => (
          $.ajax(result.links.html) //.download didn't work. .self REALLY didn't work. try .html?
            .then((picture) => fsPromises.writeFile(`server/database/photos/unsplash-${result.id}.jpg`, picture))))});
  }
}

script();