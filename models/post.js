module.exports = function(mongoose) {
  var collection = 'posts';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    id: ObjectId,
    title : { type: String, default: 'Title' },
    body  : { type: String, default: 'Body' },
    date  : { type: Date, default: Date.now }
  });

  this.model = mongoose.model(collection, schema);

  return this;
};