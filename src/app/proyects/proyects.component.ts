import { Component, OnInit } from '@angular/core';
import { Proyect } from '../proyect';
import { ProyectService } from '../proyect.service';
import { Researcher } from '../researcher';
import { ResearcherService } from '../researcher.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  proyects : Proyect[];
  researchers: Researcher[];
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
  getAllResearchers(): void{
    this.researcherService.getResearchers().subscribe((researchers)=>this.researchers=researchers)
  }

  getProyects(): void{
    this.proyectService.getProyects().subscribe((proyects)=>this.proyects=proyects)
  }

  constructor(private proyectService: ProyectService, private researcherService: ResearcherService) { }

  addProyect(): void{
    this.proyectService.addProyect(this.newProyect).subscribe(()=>{
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
    });
  }

  

  onEdit(proyect: Proyect): void {
    this.selectedProyect = proyect;
  }

  ngOnInit() { 
    this.getProyects();
    this.getAllResearchers();
  }

}
