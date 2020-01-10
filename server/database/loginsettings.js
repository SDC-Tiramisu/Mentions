//login to the specific db
//then
//>CREATE ROLE working WITH LOGIN PASSWORD 'angel';
//ALTER ROLE working CREATEDB;
const settings = {
  user: 'robertbaker',
  host: 'ip-172-31-27-253.us-east-2.compute.internal',
  database: 'SDC5mentions',
  password: 'angel',
  port: 5432,
}

module.exports = settings;