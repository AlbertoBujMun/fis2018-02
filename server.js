var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');
var cors = require('cors');
var path = require('path');
var Proyect = require('./proyects');
var ApiKey = require('./apikeys');

var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;

const PROYECTS_APP_DIR = "/dist/proyects-app"; 
var BASE_API_PATH = "/api/v1";

passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({apikey: apikey}, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown apikey ' +apikey });
            } else {
                console.log("Logged as: " + user.user);
                return done(null, user);
            }
        });
    }
));

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(express.static(path.join(__dirname, PROYECTS_APP_DIR))); 
app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, PROYECTS_APP_DIR, '/index.html')); 
}); 


app.get(BASE_API_PATH + "/proyects", 
        passport.authenticate('localapikey', {session:false}), 
        (req, res) => {
            Proyect.find((err, proyects) => {
                if (err) {
                    console.error("Error accessing database");
                    res.sendStatus(500);
                } else {
                    res.send(proyects.map((proyect) => {
                        return proyect.cleanup();
                    }));
                }
            });
});


app.post(BASE_API_PATH + "/proyects", 
    passport.authenticate('localapikey', {session:false}), 
    (req, res) => {
    // Create a new proyect
    console.log(Date()+" - POST /proyects");
    var proyect = req.body;
    Proyect.create(proyect, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

app.put(BASE_API_PATH + "/proyects", 
    passport.authenticate('localapikey', {session:false}), 
    (req, res) => {
    console.log(Date()+" - PUT /proyects");
    var proyects = req.body;
    Proyect.update(proyect, (err) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
      } else {
          res.sendStatus(201);
      }
  });
});

app.delete(BASE_API_PATH + "/proyects", 
    passport.authenticate('localapikey', {session:false}), 
    (req, res) => {
    // Remove all proyects
    console.log(Date()+" - DELETE /proyects");
    Proyect.remove(proyect, (err) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
      } else {
          res.sendStatus(201);
      }
  });
});


app.post(BASE_API_PATH + "/proyects/:id", 
    passport.authenticate('localapikey', {session:false}), 
    (req, res) => {
    // Forbidden
    console.log(Date()+" - POST /proyects");
    res.sendStatus(405);
});



/*app.get(BASE_API_PATH + "/proyects/:id", (req, res) => {
    // Get a single proyect
    var id = req.params.id;
    console.log(Date()+" - GET /proyects/"+id);

    db.find({"id": id},(err,proyects)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(proyects.length>1){
                console.warn("Incosistent DB: duplicated id");
            }
            res.send(proyects.map((proyect)=>{
                delete proyect._id;
                return proyect;
            })[0]);
        }
    });
});


app.delete(BASE_API_PATH + "/proyects/:id", (req, res) => {
    // Delete a single proyect
    var id = req.params.id;
    console.log(Date()+" - DELETE /proyects/"+id);

    db.remove({"id": id},{},(err,numRemoved)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numRemoved>1){
                console.warn("Incosistent DB: duplicated id");
            }else if(numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});
app.delete(BASE_API_PATH + "/proyects/:id", (req, res) => {
    // Delete a single proyect
    var id = req.params.id;
    console.log(Date()+" - DELETE /proyects/"+id);

    db.remove({"id": id},{},(err,numRemoved)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numRemoved>1){
                console.warn("Incosistent DB: duplicated id");
            }else if(numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

app.put(BASE_API_PATH + "/proyects/:id", (req, res) => {
    // Update proyect
    var id = req.params.id;
    var updatedProyect = req.body;
    console.log(Date()+" - PUT /proyects/"+id);

    if(id != updatedProyect.id){
        res.sendStatus(409);
        return;
    }

    db.update({"id": id},updatedProyect,(err,numUpdated)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numUpdated>1){
                console.warn("Incosistent DB: duplicated id");
            }else if(numUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});*/

module.exports.app = app;
//module.exports.db = db;