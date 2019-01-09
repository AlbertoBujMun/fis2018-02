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
          expect(res).to.be.text;
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

      chai
        .request(server.app)
        .post("/api/v1/proyects")
        .send(proyect)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("PUT /proyect/:id", () => {
    it("should return error different id", done => {
      var proyect = {
        id: "1",
        titulo: "Testeo2",
        descripcion: "Testeroni",
        fechaInicio: "2018-12-11T23:00:00.000Z",
        fechaFin: "2018-12-12T23:00:00.000Z",
        organismo: "ETSII",
        investigadorResponsable: "1",
        investigadores: ["2, 3"],
        presupuesto: "1",
        estado: "Concedido"
      };

      chai
        .request(server.app)
        .put("/api/v1/proyects/2")
        .query({ apikey: "test" })
        .send(proyect)
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });
  });

  describe("DELETE /proyects/:id", () => {
    it("should return 404 not found proyect", done => {
      var proyect = {
        id: "35",
        titulo: "Testeo2",
        descripcion: "Testeroni",
        fechaInicio: "2018-12-11T23:00:00.000Z",
        fechaFin: "2018-12-12T23:00:00.000Z",
        organismo: "ETSII",
        investigadorResponsable: "1",
        investigadores: ["2, 3"],
        presupuesto: "1",
        estado: "Concedido"
      };

      chai
        .request(server.app)
        .delete("/api/v1/proyects/35")
        .query({ apikey: "test" })
        .send(proyect)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
