exports.mongooseErrorHandler = function (err, req) {
  var errors = err.errors;
  for (var error in errors) {
    var field = errors[error].path.charAt(0).toUpperCase() + errors[error].path.slice(1);
    req.flash('error', field + ': ' + errors[error].type);
  }
}