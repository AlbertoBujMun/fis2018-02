var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var cors = require("cors");
var path = require("path");
var Proyect = require("./proyects");
var ApiKey = require("./apikeys");

var passport = require("passport");
var LocalAPIKey = require("passport-localapikey-update").Strategy;

const PROYECTS_APP_DIR = "/dist/proyects-app";
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
app.use(express.static(path.join(__dirname, PROYECTS_APP_DIR)));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, PROYECTS_APP_DIR, "/index.html"));
});

app.get(
    BASE_API_PATH + "/proyects",
    passport.authenticate("localapikey", { session: false }),
    (req, res) => {
        Proyect.find((err, proyects) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            } else {
                res.send(
                    proyects.map(proyect => {
                        return proyect.cleanup();
                    })
                );
            }
        });
    }
);

app.post(
    BASE_API_PATH + "/proyects",
    passport.authenticate("localapikey", { session: false }),
    (req, res) => {
        // Create a new proyect
        console.log(Date() + " - POST /proyects");
        var proyect = req.body;
        proyect.id =
            new Date().toISOString().substr(0, 9).replace("-", "") +
            Math.floor(Math.random() * (1000 - 1 + 1)) +
            1;
        Proyect.create(proyect, err => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
    }
);

app.put(
    BASE_API_PATH + "/proyects",
    passport.authenticate("localapikey", { session: false }),
    (req, res) => {
        console.log(Date() + " - PUT /proyects");
        var proyects = req.body;
        Proyect.update(proyect, err => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
    }
);

app.delete(
    BASE_API_PATH + "/proyects",
    passport.authenticate("localapikey", { session: false }),
    (req, res) => {
        // Remove all proyects
        console.log(Date() + " - DELETE /proyects");
        res.sendStatus(403)
    }
);

app.get(
    BASE_API_PATH + "/proyects/:id",
    passport.authenticate("localapikey", { session: false }),
    (req, res) => {
        var id = req.params.id;
        console.log(Date() + " - GET /proyects/" + id);
        // Get a single proyect
        Proyect.find({ id: id }, (err, proyects) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            } else {
                res.send(
                    proyects.map(proyect => {
                        return proyect.cleanup();
                    })
                );
            }
        });
    }
);

app.get(BASE_API_PATH + "/proyects/:id", (req, res) => {
    // Get a single proyect
    var id = req.params.id;
    console.log(Date() + " - GET /proyects/" + id);

    Proyect.find({ "id": id }, (err, proyects) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (proyects.length > 1) {
                console.warn("Incosistent DB: duplicated id");
            }
            res.send(proyects.map((proyect) => {
                delete proyect._id;
                return proyect;
            })[0]);
        }
    });
});


app.delete(BASE_API_PATH + "/proyects/:id", (req, res) => {
    // Delete a single proyect
    var id = req.params.id;
    console.log(Date() + " - DELETE /proyects/" + id);

    Proyect.deleteMany({ "id": id }, (err, removeResult) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (removeResult.n > 1) {
                console.warn("Incosistent DB: duplicated id");
            } else if (removeResult.n == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

app.put(BASE_API_PATH + "/proyect/:id", (req, res) => {
    // Update proyect
    var id = req.params.id;
    var updatedProyect = req.body;
    console.log(Date() + " - PUT /proyect/" + id);

    if (id != updatedProyect.id) {
        res.sendStatus(409);
        return;
    }

    Proyect.replaceOne({ "id": id },
        updatedProyect,
        (err, updateResult) => {
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