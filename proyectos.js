var mongoose = require("mongoose");

var proyectoSchema = new mongoose.Schema({
  titulo: string,
  descripcion: string,
  fechaInicio: Date,
  fechaFin: Date,
  organismo: string,
  investigadorResponsable: string,
  investigadores: [string],
  presupuesto: number,
  estado: string
});

proyectoSchema.methods.cleanup = function() {
  return { titulo: this.titulo, presupuesto: this.presupuesto };
};

var Proyecto = mongoose.model("Proyecto", proyectoSchema);

module.exports = Proyecto;
