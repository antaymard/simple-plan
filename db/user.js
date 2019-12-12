var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  authToken : {
      token : { type : String, default : null },
      // createdOn : { type : Date, default : null },
      // expiredOn : { type : Date, default : null }
  },
  fName : { type : String, default : null},
  lName : { type : String, default : null },
  email : String,
  profilePicUrl : { type : String, default : null},
  password : String,
})

var User = mongoose.model('User', userSchema);
module.exports = User;