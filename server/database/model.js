const db = require('./index.js')

//TO-DO: Update to Postgres
const model = {
  read: function(id) {
    return Restaurant.findOne({id}).lean();
  },

  create: function(id) {
    let record = new Restaurant({ id });
    return record.save();
  },

  update: function(id, articleId) {
    return Restaurant.findOne({id})
      .then((record) => {
        record.articles.push(articleId);∂
        return record.save();
      });
  },

  delete: function(id) {
    return Restaurant.deleteOne({id});
  }

}

export default model;