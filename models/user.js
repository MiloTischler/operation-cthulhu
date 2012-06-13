module.exports = function(mongoose) {
  var collection = 'users';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    name : { type: String, required: 'true' },
    password : { type: String, required: 'true' }
    //role : { type: String, required: 'true' }
  });

  this.model = mongoose.model(collection, schema);

  return this;
};