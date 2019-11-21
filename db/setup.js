var mongoose = require('mongoose');
var config = require('../config.js');

// MongoDB boilerplate
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on("error", function(err) {
  console.error('== Erreur connexion à la DB : %s', err);
});
mongoose.connection.on('open', function() {
  console.log('== Connexion réussie à la DB');
});