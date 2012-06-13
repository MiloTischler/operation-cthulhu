module.exports = function(mongoose) {
  var collection = 'comments';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    title : { type: String, default: 'Title', required: 'true' },
    body  : { type: String, default: 'Body' },
    post  : {type : Schema.ObjectId, ref : 'posts'},
    user  : {type : Schema.ObjectId, ref : 'users'},
    date  : { type: Date, default: Date.now }
  });

  schema.path('title').validate(function (title) {
    return title.length > 0
  }, 'Comment title cannot be blank');

  schema.path('body').validate(function (body) {
    return body.length > 0
  }, 'Comment body cannot be blank');

  this.model = mongoose.model(collection, schema);

  return this;
};