var mongoose = require("mongoose");

var proyectSchema = new mongoose.Schema({
  id: String,
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
  return {id: this.id, titulo: this.titulo, descripcion: this.descripcion, fechaInicio: this.fechaInicio, fechaFin: this.fechaFin, 
    organismo: this.organismo, investigadorResponsable: this.investigadorResponsable, investigadores: this.investigadores, presupuesto: this.presupuesto, 
    estado: this.estado };
};

var Proyect = mongoose.model("Proyect", proyectSchema);

module.exports = Proyect;
