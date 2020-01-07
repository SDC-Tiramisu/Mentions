//Use the following to launch db: "neo4j/bin/neo4j start"
const neo4j = require('neo4j-driver')
const driver = require('./loginsettings');

const settings = {
  database: 'mentions',
  defaultAccessMode: neo4j.session.READ
}
const db = driver.session(settings);
//await driver.close() //where do I run this code?!?!

module.exports = db;