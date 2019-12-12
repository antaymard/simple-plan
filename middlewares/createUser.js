const bcrypt = require('bcryptjs');

var User = require('../db/user.js');

module.exports = function (req, res) {
    console.log('Creating User');

    var data = req.body;
    console.log('data is');
    console.log(data);

    // Check if user already exists
    User
    .findOne({ email : data.email})
    .exec((err, user) => {
        if (err) err => {
            console.error('POST /signup ERR');
            console.error(err);
            return res.status(501).json({
                success : false,
                message : "Error creating user",
                error : err
            })
        }
        // If email is already used
        if (user) {
            return res.status(200).json({
                success : false,
                message : "Email déjà utilisé. Connectez-vous"
            })
        } 
        // If email is available, create a new user
        else if (!user) {
            // Create hashed password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    data.password = hash;
                    // Save the data
                    let _u = new User(data);
                    _u.save((err, done) => {
                        if (err) throw err;
                        res.send(done);
                    })
                })
            })
        }
    })
}
