var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var Proyecto = require("./proyectos");
var ApiKey = require("./apikeys");

var passport = require("passport");
var LocalAPIKey = require("passport-localapikey-update").Strategy;

const PROYECTOS_APP_DIR = "/dist/proyectos-app";
var BASE_API_PATH = "/api/v1";

passport.use(
  new LocalAPIKey((apikey, done) => {
    ApiKey.findOne({ apikey: apikey }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Unknown apikey " + apikey });
      } else {
        console.log("Logged as: " + user.user);
        return done(null, user);
      }
    });
  })
);

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use(express.static(path.join(__dirname, PROYECTOS_APP_DIR)));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, PROYECTOS_APP_DIR, "/index.html"));
});

app.get(BASE_API_PATH + "/proyectos", (req, res) => {
  Proyecto.find((err, proyectos) => {
    if (err) {
      console.error("Error accessing database");
      res.sendStatus(500);
    } else {
      res.send(
        proyectos.map(proyecto => {
          return proyecto.cleanup();
        })
      );
    }
  });
});

app.post(BASE_API_PATH + "/proyectos", (req, res) => {
  // Crear un nuevo proyecto
  console.log(Date() + " - POST /proyectos");
  var proyecto = req.body;
  Proyecto.create(proyecto, err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put(BASE_API_PATH + "/proyectos", (req, res) => {
  // Prohibido
  console.log(Date() + " - PUT /proyectos");
  res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/proyectos", (req, res) => {
  // Prohibido
  console.log(Date() + " - DELETE /proyectos");
  res.sendStatus(405);
});

app.post(BASE_API_PATH + "/proyectos/:id", (req, res) => {
  // Forbidden
  console.log(Date() + " - POST /proyectos");
  res.sendStatus(405);
});

app.get(BASE_API_PATH + "/proyectos/:id", (req, res) => {
  // Obtener un proyecto
  var id = req.params.id;
  console.log(Date() + " - GET /proyectos/" + id);

  Proyecto.find({ id: id }, (err, proyectos) => {
    if (err) {
      console.error("Error accesing DB");
      res.sendStatus(500);
    } else {
      if (proyectos.length == 0) {
        res.sendStatus(404);
      } else {
        res.send(proyectos[0].cleanup());
        if (proyectos.length > 1) {
          console.warn("Incosistent DB: duplicated id");
        }
      }
    }
  });
});

app.delete(BASE_API_PATH + "/proyectos/:id", (req, res) => {
  // Forbidden
  var id = req.params.id;
  console.log(Date() + " - DELETE /contacts/" + id);
  res.sendStatus(405);
});

app.put(BASE_API_PATH + "/proyectos/:id", (req, res) => {
  // Actualizar proyecto
  var id = req.params.id;
  var updatedProyecto = req.body;
  console.log(Date() + " - PUT /proyectos/" + id);

  if (id != updatedProyecto.id) {
    res.sendStatus(409);
    return;
  }

  Proyecto.replaceOne({ id: id }, updatedProyecto, (err, updateResult) => {
    if (err) {
      console.error("Error accesing DB");
      res.sendStatus(500);
    } else {
      if (updateResult.n > 1) {
        console.warn("Incosistent DB: duplicated id");
      } else if (updateResult.n == 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    }
  });
});

module.exports.app = app;
