var express = require("express");
var app = express();
var bodyParser  = require('body-parser');
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var apiRoutes = express.Router();
// app.use('/api', apiRoutes); // Monter le routeur sur l'app
// apiRoutes.use(userFromTokenMiddleware);
// apiUser(apiRoutes); // ???
// apiArticle(apiRoutes); // ???

// BOOTING
require('./db/setup.js');

// USER IS LOGGING IN
const authenticateUser = require("./middlewares/authenticateUser.js").authenticateUser;
app.post('/authenticate', authenticateUser);

// USER IS LOGGED IN
// Middleware de décodage du token user ; next vers les requêtes api
const userFromTokenMiddleware = require("./middlewares/userFromToken.js"); // maybe no ()
var userFromTokenRouter = express.Router();
userFromTokenRouter.use('/', userFromTokenMiddleware); 
app.use("/api", userFromTokenRouter); // checker si je mets / et /api au dessus

// PRIVATE API ROUTES
// Project endpoints
const projectApi = require('./api/projectApi.js');
projectApi(userFromTokenRouter);
// Job endpoints
const jobApi = require('./api/jobApi.js');
jobApi(userFromTokenRouter);

// SERVER RUNNING TEST
app.get('/', (req, res) => {
  res.send('working');
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("---- listening")
})