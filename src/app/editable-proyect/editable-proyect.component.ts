import { Component, OnInit, Input } from '@angular/core';
import { Proyect } from '../proyect';
import { ProyectService } from '../proyect.service';
import { Researcher } from '../researcher';
import { ResearcherService } from '../researcher.service';

@Component({
  selector: '[app-editable-proyect]',
  templateUrl: './editable-proyect.component.html',
  styleUrls: ['./editable-proyect.component.css']
})
export class EditableProyectComponent implements OnInit {

  @Input() proyect: Proyect;

  editing = false;

  responsibleResearcher: Researcher[];

  onEdit(): void {
    if (this.editing) {
      this.proyectService.updateProyect(this.proyect)
         .subscribe(() => this.editing = !this.editing);
    } else {
      this.editing = ! this.editing;
    }
  }

  getResponsibleResearcher(): void{
    if(this.proyect.investigadorResponsable!=null){
      this.researcherService.getResearcher(this.proyect.investigadorResponsable).subscribe((responsibleResearcher)=>this.responsibleResearcher=responsibleResearcher)
    }
  }



  constructor(private proyectService: ProyectService, private researcherService: ResearcherService) { }

  ngOnInit() {
    this.getResponsibleResearcher();
  }

}