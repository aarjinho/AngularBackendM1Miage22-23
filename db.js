var mongoose = require('mongoose');
const uri ="mongodb+srv://aarji:iP1WwVaJgUVXedGH@cluster0.9swzbqa.mongodb.net/users?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true};
mongoose.set("strictQuery", false);

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:3000/ que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });