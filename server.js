var express = require("express");
var app = express();
var bodyParser  = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// BOOTING
require('./db/setup.js');

// USER IS LOGGING IN OR CREATE ACCOUNT ============================================
// Loging In
const authenticateUser = require("./middlewares/authenticateUser.js");
app.post('/authenticate', authenticateUser);
// Creating Account
const createUser = require('./middlewares/createUser.js');
app.post('/signup', createUser);

// USER IS LOGGED IN ===============================================================
// Middleware de décodage du token user ; next vers les requêtes api
const userFromTokenMiddleware = require("./middlewares/userFromToken.js"); // maybe no ()
var userFromTokenRouter = express.Router();
userFromTokenRouter.use('/', userFromTokenMiddleware); 
app.use("/api", userFromTokenRouter); // checker si je mets / et /api au dessus

// PRIVATE API ROUTES =============================================================
// Project endpoints
const projectApi = require('./api/projectApi.js');
projectApi(userFromTokenRouter);
// Job endpoints
const jobApi = require('./api/jobApi.js');
jobApi(userFromTokenRouter);

// SERVER RUNNING
// Serve static files from React app
app.use(express.static(path.join(__dirname, 'my-app/build')));

// Other requests that triggers the index display
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/my-app/build/index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("---- listening")
})