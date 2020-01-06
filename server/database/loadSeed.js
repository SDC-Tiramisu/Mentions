const fs= require('fs');
const readline = require('readline'); //https://nodejs.org/api/readline.html
const neo4j = require('neo4j-driver')
const driver = require('./loginsettings');
const _ = require('underscore');

const settings = {
  defaultAccessMode: neo4j.session.READ
};
const db = driver.session(settings);


let script = async function () {
  const photosFile = 'server/database/photos.json';
  const authorsFile = 'server/database/authors.json';
  const articlesFile = 'server/database/articles.json';
  const restaurantsFile = 'server/database/restaurants.json';
  console.log('starting photos load');
  await translateJSONToDB(photosFile, insertPhotosToDB);
  console.log('starting authors load');
  await translateJSONToDB(authorsFile, insertAuthorsToDB);
  console.log('starting articles load');
  await translateJSONToDB(articlesFile, insertArticlesToDB);
  console.log('starting restaurants load');
  await translateJSONToDB(restaurantsFile, insertRestaurantsToDB);
  await driver.close();
};

// reads the JSON file at filePath assuming line breaks are items.
let translateJSONToDB = async function (filePath, inserter) {
  const fileHandle = fs.openSync(filePath);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    let json = JSON.parse(line.toString());
    await inserter(json); //await is needed just in case because of adding connections to non-existent vertices potentially
  }
};

//the functiosn for taking the JSOn and putting it into the DB
// the following below this is neo4j stuff.
const insertPhotosToDB = async function (json) {
  return db.run(`CREATE
    (photo:Photo
      {id: ${json.id}, url: '${json.url}'})`);
};

const insertAuthorsToDB = async function (json) {
  return db.run(`CREATE
    (author:Author
      {id: ${json.id}, firstName: '${json.firstName}', lastName: '${json.lastName}'})`)
    .then(db.run(`CREATE
      (author:Author {id: ${json.id}})-[:IN_PICTURE]->(photo:Photo {id: ${json.photo}}`));
};

async function insertArticlesToDB (json) {
  return db.run(`CREATE
    (article:Article
      {id: ${json.id}, title: '${json.title}', body: '${json.body}'})`)
    .then(db.run(`CREATE
      (article:Article {id: ${json.id}})-[:WRITTEN_BY]->(author:Author {id: ${json.author}}`));
};

async function insertRestaurantsToDB (json) {
  return db.run(`CREATE
    (article:Article
      {id: ${json.id}, title: '${json.title}''})`)
    .then( async function () {
      let promises = [];
      for (article of json.article) {
        promises.push(db.run(`CREATE
          (restaurant:Restaurant {id: ${json.id}})-[:REVIEWED_IN]->(article:Article {id: ${article}}`));
      }
      await Promise.all(promises); //I think this will make sure all promises go through before continuing. Is it necessary though?
    });
};



script();