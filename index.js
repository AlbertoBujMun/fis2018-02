var express = require("express");
 var bodyParser = require("body-parser");
 var DataStore = require("nedb");
 var cors = require('cors')

var path = require('path') 
const PROYECTS_APP_DIR = "/dist/proyects-app";

var PORT = (process.env.PORT || 3000);
 var BASE_API_PATH = "/api/v1";
 var dbFileName = __dirname + "/proyects.json";

 console.log("Starting API server...");

 var app = express();
 app.use(bodyParser.json());
 app.use(cors());

app.use(express.static(path.join(__dirname, PROYECTS_APP_DIR))); 
app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, PROYECTS_APP_DIR, '/index.html')); 
}); 

 var initialProyects = [
    { "id": "1", "titulo": "Test", "descripcion": "Descripcion",  "fechaInicio" : "2019-01-04", "fechaFin" : "2019-01-04", "organismo":"organismo", "investigadorResponsable" : "1", "investigadores" : ["1", "3"], "presupuesto" :"2", "estado":"concedido"},
    { "id": "2", "titulo": "Test", "descripcion": "Descripcion",  "fechaInicio" : "2019-01-04", "fechaFin" : "2019-01-04", "organismo":"organismo", "investigadorResponsable" : "1", "investigadores" : ["1", "3"], "presupuesto" :"2", "estado":"concedido"},
    { "id": "3", "titulo": "Test", "descripcion": "Descripcion",  "fechaInicio" : "2019-01-04", "fechaFin" : "2019-01-04", "organismo":"organismo", "investigadorResponsable" : "1", "investigadores" : ["1", "3"], "presupuesto" :"2", "estado":"concedido"},
    { "id": "4", "titulo": "Test", "descripcion": "Descripcion",  "fechaInicio" : "2019-01-04", "fechaFin" : "2019-01-04", "organismo":"organismo", "investigadorResponsable" : "1", "investigadores" : ["1", "3"], "presupuesto" :"2", "estado":"concedido"},
    { "id": "5", "titulo": "Test", "descripcion": "Descripcion",  "fechaInicio" : "2019-01-04", "fechaFin" : "2019-01-04", "organismo":"organismo", "investigadorResponsable" : "1", "investigadores" : ["1", "3"], "presupuesto" :"2", "estado":"concedido"},
    { "id": "6", "titulo": "Test", "descripcion": "Descripcion",  "fechaInicio" : "2019-01-04", "fechaFin" : "2019-01-04", "organismo":"organismo", "investigadorResponsable" : "1", "investigadores" : ["1", "3"], "presupuesto" :"2", "estado":"concedido"}
    
 ];

 var db = new DataStore({
     filename: dbFileName,
     autoload: true
 });

 db.find({},(err,proyects)=>{
     if(err){
         console.error("Error accesing DB");
         process.exit(1);
     }else{
         if(proyects.length == 0){
             console.log("Empty DB, initializaing data...");
             db.insert(initialProyects);
         }else{
             console.log("Loaded DB with "+proyects.length+" proyects.");
         }
            
     }
 });


 app.get(BASE_API_PATH + "/proyects", (req, res) => {
     // Obtain all proyects
     console.log(Date()+" - GET /proyects");
     
     db.find({},(err,proyects)=>{
         if(err){
             console.error("Error accesing DB");
             res.sendStatus(500);
         }else{
             res.send(proyects.map((proyect)=>{
                 delete proyect._id;
                 return proyect;
             }));
         }
     });

 });

 app.post(BASE_API_PATH + "/proyects", (req, res) => {
     // Create a new proyect
     console.log(Date()+" - POST /proyects");

     var proyect = req.body;

     db.insert(proyect);

     res.sendStatus(201);
 });

 app.put(BASE_API_PATH + "/proyects", (req, res) => {
     // Forbidden
     console.log(Date()+" - PUT /proyects");

     res.sendStatus(405);
 });

 app.delete(BASE_API_PATH + "/proyects", (req, res) => {
     // Remove all proyects
     console.log(Date()+" - DELETE /proyects");

     db.remove({});
     
     res.sendStatus(200);
 });


 app.post(BASE_API_PATH + "/proyects/:id", (req, res) => {
     // Forbidden
     console.log(Date()+" - POST /proyects");

     res.sendStatus(405);
 });



 app.get(BASE_API_PATH + "/proyects/:id", (req, res) => {
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
 });

 app.listen(PORT);

 console.log("Server ready with static content!");