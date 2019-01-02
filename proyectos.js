var mongoose = require("mongoose");

var proyectoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaInicio: Date,
  fechaFin: Date,
  organismo: String,
  investigadorResponsable: String,
  investigadores: [String],
  presupuesto: Number,
  estado: String
});

proyectoSchema.methods.cleanup = function() {
  return { titulo: this.titulo, presupuesto: this.presupuesto };
};

var Proyecto = mongoose.model("Proyecto", proyectoSchema);

module.exports = Proyecto;
