var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  authToken : {
      token : { type : String, default : null },
      // createdOn : { type : Date, default : null },
      // expiredOn : { type : Date, default : null }
  },
  firstName : { type : String, default : null},
  email : String,
//   imageAddress : { type : String, default : null},
  password : String,
})

var User = mongoose.model('User', userSchema);
module.exports = User;