import { Component, OnInit } from "@angular/core";
import { Proyecto } from "../proyecto";
import { ProyectoService } from "../proyecto.service";

@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.css"]
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[];
  selectedProyecto: Proyecto;
  newProyecto: Proyecto = {
    titulo: null,
    descripcion: null,
    fechaInicio: null,
    fechaFin: null,
    organismo: null,
    investigadorResponsable: null,
    investigadores: null,
    presupuesto: null,
    estado: null
  };

  constructor(private proyectoService: ProyectoService) {}

  addProyecto() {
    this.proyectos.push(this.newProyecto);
    this.newProyecto = {
      titulo: null,
      descripcion: null,
      fechaInicio: null,
      fechaFin: null,
      organismo: null,
      investigadorResponsable: null,
      investigadores: null,
      presupuesto: null,
      estado: null
    };
  }

  getProyectos() {
    this.proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

  ngOnInit() {
    this.getProyectos();
  }
}
