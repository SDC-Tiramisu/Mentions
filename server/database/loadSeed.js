const fs= require('fs');
const readline = require('readline'); //https://nodejs.org/api/readline.html
const neo4j = require('neo4j-driver')
const driver = require('./loginsettings');
const _ = require('underscore');

const settings = {
  defaultAccessMode: neo4j.session.READ
};
const db1 = driver.session(settings);
const db2 = driver.session(settings);
const db3 = driver.session(settings);
let db = [];
for (let i = 0; i < 20; i++) {
  db.push(driver.session(settings));
}

let script = async function () {
  //  await threads12();
  await threads123(); //added Indexes to the database manually to make edges hopefully go fast enough on second try.
  await driver.close();
};

async function threads12() {
  return loadNodes1();
};

async function threads123() {
  // const promise1 = loadNodes2();
  // const promise2 = loadEdges1();
  // await Promise.all([promise1, promise2]);
  return loadEdges2();
};

async function loadNodes1() {
  const photosFile = 'server/database/photos.json';
  const authorsFile = 'server/database/authors.json';
  console.log('starting photos load');
  const promise1 = translateJSONToDB(photosFile, insertPhotosToDB);
  console.log('Starting Authors load');
  const promise2 = translateJSONToDB(authorsFile, insertAuthorsToDB);
  return Promise.all([promise1, promise2]);
};

async function loadNodes2() {
  const articlesFile = 'server/database/articles.json';
  const restaurantsFile = 'server/database/restaurants.json';
  console.log('Starting Articles load');
  const promise1 = translateJSONToDB(articlesFile, insertArticlesToDB);
  console.log('Starting Restaurants load');
  const promise2 = translateJSONToDB(restaurantsFile, insertRestaurantsToDB);
  return Promise.all([promise1, promise2]);
};

async function loadEdges1() {
  const authorsFile = 'server/database/authors.json';
  console.log('Starting PicturedBy load');
  return translateJSONToDB(authorsFile, insertPicturedByToDB);
};

async function loadEdges2() {
  const articlesFile = 'server/database/articles.json';
  const restaurantsFile = 'server/database/restaurants.json';
  console.log('Starting WrittenBy load');
  // const promise1 = translateJSONToDB(articlesFile, insertWrittenByToDB);
  return translateJSONToDB(articlesFile, insertWrittenByToDB);
  // console.log('Starting ReviewedIn load');
  // const promise2 = translateJSONToDB(restaurantsFile, insertReviewedInToDB);
  // return Promise.all([promise1, promise2]);
}

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
async function insertPhotosToDB (json) {
  return db1.run(`CREATE
    (:Photo {id: ${json.id}, url: '${json.url}'})`);
};

async function insertAuthorsToDB (json) {
  return db2.run(`CREATE (:Author {id: ${json.id}, firstName: '${_.escape(json.firstName)}', lastName: '${_.escape(json.lastName)}'})`);
};

async function insertArticlesToDB (json) {
  return db1.run(`CREATE (:Article {id: ${json.id}, title: '${_.escape(json.title)}', body: '${_.escape(json.body)}'})`);
};

async function insertRestaurantsToDB (json) {
  return db2.run(`CREATE (restaurant:Restaurant {id: ${json.id}, title: '${_.escape(json.title)}'})`);
};

async function insertPicturedByToDB (json) {
  return db3.run(`MATCH (photo:Photo {id: ${json.image}})
    MATCH (author:Author {id: ${json.id}})
    CREATE (author)-[:PICTURED_BY]->(photo)`);
};

async function insertWrittenByToDB (json) {
  return db1.run(`MATCH (author:Author {id: ${json.author}})
    MATCH (article:Article {id: ${json.id}})
    CREATE (article)-[:WRITTEN_BY]->(author)`);
}

async function insertReviewedInToDB (json) {
  const baseQuery = `MATCH (restaurant:Restaurant {id: ${json.id}})
  `;
  let promises = [];
  for (let i = 0; i < json.articles.length; i++) {
    let article = json.articles[i]
    let query = baseQuery + `MATCH (article${i}:Article {id: ${article}})
    `;
    query = query + `CREATE (restaurant)-[:REVIEWED_IN]->(article${i})
    `;
    promises.push(db[i].run(query))
  }
  return Promise.all(promises);
}



script();