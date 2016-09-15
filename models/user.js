var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Campsite = require('./campsite');
var Comments

var UserSchema = new mongoose.Schema();
UserSchema.add({
  local : {
    email    : { type: String,  required: true },
    password : { type: String,  required: true },
    // admin: Boolean,
  },
  visited : [ { type: mongoose.Schema.Types.ObjectId, ref: 'Campsite' } ],
  // comments : [ { type : mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
