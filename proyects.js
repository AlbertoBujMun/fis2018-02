var mongoose = require("mongoose");

var proyectSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaInicio: Date,
  fechaFin: Date,
  organismo: String,
  investigadorResponsable: String,
  investigadores: [String],
  presupuesto: String,
  estado: String
});

proyectSchema.methods.cleanup = function() {
  return { titulo: this.titulo, descripcion: this.descripcion };
};

var Proyect = mongoose.model("Proyect", proyectSchema);

module.exports = Proyect;
