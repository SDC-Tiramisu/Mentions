const db = require('./index.js')
const _ = require('underscore');

//TO-DO: Update to Postgres
const model = {

  read: async function (id) {
    return db.query(`SELECT * FROM restaurants WHERE id = ${id}`);
  },

  create: async function (id, json) {
    return db.query(`INSERT INTO restaurants VALUES
    (${id}, '${_.escape(json.title)}', ARRAY ${JSON.stringify(json.articles)});`);
  },

  //I'm not entirely sure this will work as intended, but I think it will.
  update: async function (id, articleId) {
    return db.query(`SELECT articleArray FROM restaurants WHERE id = ${id}`)
      .then((results) =>
      (db.query(`UPDATE restaurants SET articleArray = ARRAY ${JSON.stringify([results.rows[0].articlearray, articleId].flat())} WHERE id = ${id}`)));
  },

  delete: async function (id) {
    return db.query(`DELETE FROM restaurants WHERE id = ${id}`)
  }

}

module.exports = model;