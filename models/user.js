var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Todo = require('./todo');
var Campsite = require('./campsite');

var UserSchema = new mongoose.Schema();
UserSchema.add({
  local : {
    email    : { type: String,  required: true },
    password : { type: String,  required: true },
    // admin: Boolean,
  },
  // todos :   [ Todo.schema ],
  visited :  [ Number ],
  // comments : [ { type : Comment.schema } ]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
