var mongoose = require('mongoose');

// var User = require('./user');
var Campsite = require('./campsite');

var CommentSchema = new mongoose.Schema({
  // User:    { type: User.schema }, //User.schema,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Campsite: { type: Campsite.schema },
  content: String
  },
  { timestamps: true }  // createdAt, updatedAt
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

CommentSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

CommentSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};

module.exports = mongoose.model('Comment', CommentSchema);
