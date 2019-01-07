var server = require("./server");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;

console.log("Starting API server...");

mongoose.connect("mongodb://localhost:27017");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  server.app.listen(PORT);
  console.log("Server ready!");
});
