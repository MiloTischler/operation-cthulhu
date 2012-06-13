module.exports = function(mongoose) {
  var collection = 'posts';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    title : { type: String, default: 'Title', required: 'true' },
    body  : { type: String, default: 'Body' },
    user  : { type : Schema.ObjectId, ref : 'users', required: 'true'},
    date  : { type: Date, default: Date.now }
  });

  schema.path('title').validate(function (title) {
    return title.length > 0
  }, 'Post title cannot be blank');

  schema.path('body').validate(function (body) {
    return body.length > 0
  }, 'Post body cannot be blank');

  this.model = mongoose.model(collection, schema);

  return this;
};