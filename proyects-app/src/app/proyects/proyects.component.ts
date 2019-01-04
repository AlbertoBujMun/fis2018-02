import { Component, OnInit } from '@angular/core';
import { Proyect } from '../proyect';
import { PROYECTS } from '../mock-proyects';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  proyects = PROYECTS;
  selectedProyect : Proyect;

  newProyect : Proyect={
    id:null,
    titulo:null,
    descripcion:null,
    fechaInicio:null,
    fechaFin:null,
    organismo:null,
    investigadorResponsable:null,
    investigadores:null,
    presupuesto:null,
    estado:null,
  };

  constructor() { }

  addProyect(): void{
    this.proyects.push(this.newProyect);
    this.newProyect={
      id:null,
      titulo:null,
      descripcion:null,
      fechaInicio:null,
      fechaFin:null,
      organismo:null,
      investigadorResponsable:null,
      investigadores:null,
      presupuesto:null,
      estado:null,
    };
  
  }

  onEdit(proyect: Proyect): void {
    this.selectedProyect = proyect;
  }

  ngOnInit() { 
  }

}
