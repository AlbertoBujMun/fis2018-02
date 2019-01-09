var chai = require("chai");
var mongoose = require("mongoose");
var Proyect = require("../proyects");
var expect = chai.expect;

describe("Proyect DB connection", () => {
  before(done => {
    var dbUrl = process.env.DB || "mongodb://localhost/test";

    mongoose.connect(dbUrl);
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      done();
    });
  });

  beforeEach(done => {
    Proyect.deleteMany({}, err => {
      done();
    });
  });

  it("writes a proyect in the DB", done => {
    var proyect = new Proyect({
      id: "1",
      titulo: "Testeo",
      descripcion: "Testeroni",
      fechaInicio: "2018-12-11T23:00:00.000Z",
      fechaFin: "2018-12-12T23:00:00.000Z",
      organismo: "ETSII",
      investigadorResponsable: "1",
      investigadores: ["2, 3"],
      presupuesto: "1",
      estado: "Concedido"
    });
    proyect.save((err, proyect) => {
      expect(err).is.null;
      Proyect.find({}, (err, proyects) => {
        expect(proyects).to.have.lengthOf(1);
        // More "expects" could be done
        done();
      });
    });
  });
});

after(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done);
  });
});
