const neo4j = require('neo4j-driver')
const settings = require('./loginsettings');

//"pg_ctl start -D postgres -l logfile" to start the server?
//I got it running I think with
//postmaster -D postgres >logfile >2&1 &
const db = new Client(settings);
db.connect();


module.exports = db;