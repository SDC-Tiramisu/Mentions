//login to the specific db
//then
//>CREATE ROLE working WITH LOGIN PASSWORD 'angel';
//ALTER ROLE working CREATEDB;
const settings = {
  database: 'mentions',
  defaultAccessMode: neo4j.session.READ
}

module.exports = settings;