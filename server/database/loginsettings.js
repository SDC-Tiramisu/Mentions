//login to the specific db
//then
//>CREATE ROLE working WITH LOGIN PASSWORD 'angel';
//ALTER ROLE working CREATEDB;
const settings = {
  user: 'working',
  host: 'localhost',
  database: 'SDC5mentions',
  password: 'angel',
  port: 5432,
}

module.exports = settings;