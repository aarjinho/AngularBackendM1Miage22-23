let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
var db = require('./db');
var users=require('./auth/AuthController')
var User=require('./user/User')


var VerifyToken = require('./auth/VerifyToken');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('./config');


let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri ="mongodb+srv://aarjinho:Uoto8EcqGqpjiUPh@cluster0.9swzbqa.mongodb.net/assignments?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true};
mongoose.set("strictQuery", false);



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix+'/:nom').get(assignment.searchAssignment); 

app.route(prefix+'/auth/register').post(users.register);

app.route(prefix+'/auth/login').post(users.login);

app.route(prefix+'/auth/logout').get(users.logout);

global.__root   = __dirname + '/'; 


// // CREATES A NEW USER
// app.post('/api/users/', function (req, res) {
//   User.create({
//           email : req.body.email,
//           password : req.body.password,
//           role :'student' 
//       }, 
//       function (err, user) {
//           if (err) return res.status(500).send("There was a problem adding the information to the database.");
//           res.status(200).send(user);
//       });
// });

// // RETURNS ALL THE USERS IN THE DATABASE
// app.get('/', function (req, res) {
//   User.find({}, function (err, users) {
//       if (err) return res.status(500).send("There was a problem finding the users.");
//       res.status(200).send(users);
//   });
// });

// app.post('api/auth/login', function(req, res) {

//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) return res.status(500).send('Error on the server.');
//     if (!user) return res.status(404).send('No user found.');
    
//     // check if the password is valid
//     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

//     // if user is found and password is valid
//     // create a token
//     var token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });

//     // return the information including token as JSON
//     res.status(200).send({ auth: true, token: token });
//   });

// });

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

// var UserController = require(__root + 'user/UserController');
// app.use('/api/users', UserController);

// var AuthController = require(__root + 'auth/AuthController');
// app.use('/api/auth', AuthController);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


