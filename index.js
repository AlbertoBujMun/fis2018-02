var server = require("./server");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;
var dbUrl = (process.env.DB || "mongodb://fis2018:asdf1234@ds251284.mlab.com:51284/fis2018-02");
var ApiKey = require('./apikeys');

console.log("Starting API server...");

mongoose.connect(dbUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    server.app.listen(PORT);
    console.log("Server ready!");
    if (ApiKey.find((err, apikeys) => {
            if (apikeys.length == 0) {
                var testUser = new ApiKey({ user: "fis", password: "asdf" });
                testUser.save(function(err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('user: ' + user.user + ", " + user.apikey + " saved.");
                    }
                });
            }
        }));
});