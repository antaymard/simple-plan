const bcrypt = require('bcryptjs');
const generateToken = require("../functions/generateToken.js");

var User = require('../db/user.js');

module.exports = function(req, res) {
    console.log('Authenticating User');

    var data = req.body;
    console.log('data is');
    console.log(data);

    // Find the user according to email
    User
    .findOne({ email : data.email })
    .exec((err, user) => {
        // If error
        if (err) err => {
            console.error('POST /authenticate ERR');
            console.error(err);
            return res.status(501).json({
                success : false,
                message : "Error authenticating user",
                error : err
            })
        }
        // If user exists
        if (user) {
            // If hashed passwords match
            if (bcrypt.compareSync(data.password, user.password)) {
                // If no token in DB, create one and send it
                if (!user.authToken.token) {
                    let newToken = generateToken();
                    user.authToken.token = newToken;
                    user.save();
                    console.log("token créé et transmis");
                    res.status(200).json({
                        success : true,
                        message : "Connexion réussie - token créé et transmis",
                        token : newToken
                    });
                } 
                // If token exists, send it to client
                else if (user.authToken.token) {
                    res.status(200).json({
                        success : true,
                        message : "Connexion réussie - token déjà existant",
                        token : user.authToken.token
                    });
                }
            } 
            // If hashed passwords don't match
            else {
                console.log("Auth failed - mauvais password");
                res.status(200).json({
                    success : false,
                    message : "Connexion échouée - mot de passe incorrect"
                });
            }
        } 
        else if (!user) {
            console.log("Aucun utilisateur avec cet email");
            res.status(200).json({
                success : false,
                message : "Connexion échouée : aucun utilisateur ne possède cet email"
            });
        }
    })
}
