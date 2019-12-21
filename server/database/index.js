const { Client } = require('pg')
const settings = require('./loginsettings');
const Restaurant = require('./schema.js');


const db = new Client(settings)
await db.connect()


module.exports = db;