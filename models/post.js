module.exports = function(mongoose) {
  var collection = 'posts';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    id: ObjectId,
    title: { type: String, default: 'mytitle' },
    body: { type: String, default: 'mybody' }
  });

  this.model = mongoose.model(collection, schema);

  return this;
};