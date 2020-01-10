const fs= require('fs');
const readline = require('readline'); //https://nodejs.org/api/readline.html
const db = require('./index.js');
const _ = require('underscore');

let script = async function () {
  const photosFile = 'server/database/photos.json';
  const authorsFile = 'server/database/authors.json';
  const articlesFile = 'server/database/articles.json';
  const restaurantsFile = 'server/database/restaurants.json';
  // console.log('starting photos load');
  // await translateJSONToDB(photosFile, insertPhotosToDB);
  // console.log('starting authors load');
  // await translateJSONToDB(authorsFile, insertAuthorsToDB);
  console.log('starting articles load');
  await translateJSONToDB(articlesFile, insertArticlesToDB);
  console.log('starting restaurants load');
  await translateJSONToDB(restaurantsFile, insertRestaurantsToDB);
  await db.end();
};

// reads the JSON file at filePath assuming line breaks are items.
// let translateJSONToDB = function (filePath, inserter) {
  // let fileHandle = use fs to open(filePath)
  // let currentLine = 1 because iti's formatted as an array
  // possibly let readBuffer be made from reading of fileHandle
  // const readJSONLineByLine = function () {
  //   let line be reading in of fileHandle or readBuffer at currentLine
  //   return JSON.parse(line);
  // };
  // let maxLine = fileHandle line count - 2
  // while(currentLine < maxLine) {
  //   let json = readJSONLineByLine();
  //   inserter(json);
  //   currentLine++
  // }
  // let fileHandle = fs.createReadStream(filePath)
  // let currentLine = 1 //because iti's formatted as an array
  // //possibly let readBuffer be made from reading of fileHandle
  // let maxLine = fs.lines(fileHandle) - 2
  // while(currentLine < maxLine) {
  //   let line = fsPromises.read(fileHandle, curentLine); //reading in of fileHandle or readBuffer at currentLine
  //   let json = JSON.parse(line);
  //   inserter(json);
  //   currentLine++;
  // }
  // return null; //just to have a return statement.
// };
let translateJSONToDB = async function (filePath, inserter) {
  const fileHandle = fs.openSync(filePath);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
     crlfDelay: Infinity
  });
  for await (const line of rl) {
    let json = JSON.parse(line.toString());
    await inserter(json); //I don't htink await is needed here? It might need be to not mess up the sequence object I'm using in Postgres.
  }
};

//the functiosn for taking the JSOn and putting it into the DB
const insertPhotosToDB = async function (json) {
  return db.query(`INSERT INTO photos VALUES
  (${json.id}, '${json.url}');`);
};

const insertAuthorsToDB = async function (json) {
  return db.query(`INSERT INTO authors VALUES
  (${json.id}, '${_.escape(json.firstName)}', '${_.escape(json.lastName)}', ${json.image});`);
};

const insertArticlesToDB = async function (json) {
  return db.query(`INSERT INTO articles VALUES
  (${json.id}, '${_.escape(json.title)}', '${_.escape(json.body)}', ${json.author});`);
};

const insertRestaurantsToDB = async function (json) {
  return db.query(`INSERT INTO restaurants VALUES
  (${json.id}, '${_.escape(json.title)}', ARRAY ${JSON.stringify(json.articles)});`);
};



script();