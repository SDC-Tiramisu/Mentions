const neo4j = require('neo4j-driver')
const settings = require('./loginsettings');
const Restaurant = require('./schema.js');


const driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j','neo4j')
);
const db = driver.session(settings);
//await driver.close() //where do I run this code?!?!


module.exports = db;