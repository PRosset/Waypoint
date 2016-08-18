var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Todo = require('./todo');
var Campsite = require('./campsite');
// var Comment = require('./comment');

var UserSchema = new mongoose.Schema({
  local : {
    // firstName: { type: String,  required: true },
    lastName : String,
    email    : { type: String,  required: true },
    password : { type: String,  required: true },
  },
  todos :   [ Todo.schema ],
  visited:  [ Campsite.schema ],
  // comments: [ Comment.schema ]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
