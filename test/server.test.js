var server = require("../server");
var chai = require("chai");
var chaiHttp = require("chai-http");
var sinon = require("sinon");
var Proyect = require("../proyects");
var ApiKey = require("../apikeys");
var expect = chai.expect;

chai.use(chaiHttp);

describe("Proyects API", () => {
  before(() => {
    var ApiKeyStub = sinon.stub(ApiKey, "findOne");
    ApiKeyStub.yields(null, new ApiKey({ user: "test" }));
  });

  it("hola mundo de prueba", done => {
    var x = 3;
    var y = 5;

    var resultado = x + y;

    expect(resultado).to.equal(8);
    done();
  });

  describe("GET /", () => {
    it("should return HTML", done => {
      chai
        .request(server.app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        });
    });
  });

  describe("GET /proyects", () => {
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
    var proyectMock = sinon.mock(proyect);
    proyectMock.expects("cleanup").returns({
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

    var ProyectStub = sinon.stub(Proyect, "find");
    ProyectStub.yields(null, [proyect]);

    it("should return all proyects", done => {
      chai
        .request(server.app)
        .get("/api/v1/proyects")
        .query({ apikey: "test" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(1);
          proyectMock.verify();
          done();
        });
    });
  });

  describe("POST /proyect", () => {
    it("should create a new proyect", done => {
      var proyect = {
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
      };
      var dbMock = sinon.mock(Proyect);
      dbMock.expects("create").yields(null);

      chai
        .request(server.app)
        .post("/api/v1/proyects")
        .query({ apikey: "test" })
        .send(proyect)
        .end((err, res) => {
          expect(res).to.have.status(201);
          dbMock.verify();
          done();
        });
    });
  });

  describe("POST /proyects", () => {
    it("should return 401 if there's no apikey", done => {
      var proyect = {
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
      };
      var dbMock = sinon.mock(Proyect);

      chai
        .request(server.app)
        .post("/api/v1/proyects")
        .send(proyect)
        .end((err, res) => {
          expect(res).to.have.status(401);
          dbMock.verify();
          done();
        });
    });
  });
});
