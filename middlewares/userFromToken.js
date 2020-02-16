var User = require('../db/user.js');

// module.exports = function(req, res, next) {
//   console.log('userFromToken middleware called');
//   next();
// }

module.exports = function (req, res, next) {

  console.log("UserFromToken middleware called");

  let token = req.body.token || req.params.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    User
      .findOne({ "authToken.token": token })
      .select(" -password ")
      .exec((err, user) => {
        // Error
        if (err) err => {
          console.error("APIROUTE MIDDLEWARE ERR");
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "apiRoutes MIDDLEWARE error",
            error: err
          })
        }
        // Token est ok
        if (user) {
          console.log('MIDDLEWARE - token validated');
          console.log('=== QUERY')
          console.log(res.query);
          console.log('=== PARAMS')
          console.log(req.params)
          req.authUser = user; // injecter les infos de l'user, pas seulement l'id
          next();
        }
        // token ne trouve aucun user
        else {
          console.log("MIDDLEWARE - Token matches no user");
          req.authUser = null;
          return res.status(401).json({
            success: false,
            message: "Bad connexion token"
          })
          // next(); // nexter vraiment ? pas de stop ici ?
        }
      })
  } else {
    console.error("MIDDLEWARE - No token provided");
    req.authUser = null;
    // next(); // nexter vraiment ? pas de stop ici ?
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};