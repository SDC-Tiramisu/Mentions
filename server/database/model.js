const Restaurant = require('./database/schema.js');
const db = require('./index.js')

//TO-DO: Update to Postgres
const model = {
  read: async function(id) {
    return db.query(`SELECT * FROM restaurants WHERE id = ${id}`)
  },

  create: async function(json) {
    return db.query(`INSERT INTO restaurants VALUES
    (${json.id}, '${_.escape(json.title)}', ARRAY ${JSON.stringify(json.articles)});`);
  },
  //I'm not entirely sure this will work as intended, but I think it will.
  update: async function(id, articleId) {
    return db.query(`SELECT articlesArray FROM restaurants WHERE id = ${id}`)
      .then((results) => (db.query(`UPDATE restaurants SET articlesArray = ${JSON.stringify([results, articleId].flat())} WHERE id = ${id}`)

  },

  delete: async function(id) {
    return db.query(`DELETE FROM restaurants WHERE id = ${id}`)
  }

}

export default model;