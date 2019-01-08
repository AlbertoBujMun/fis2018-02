import { Component, OnInit, Input } from '@angular/core';
import { Proyect } from '../proyect';
import { ProyectService } from '../proyect.service';

@Component({
  selector: '[app-editable-proyect]',
  templateUrl: './editable-proyect.component.html',
  styleUrls: ['./editable-proyect.component.css']
})
export class EditableProyectComponent implements OnInit {

  @Input() proyect: Proyect;

  editing = false;

  

  onEdit(): void {
    if (this.editing) {
      this.proyectService.updateProyect(this.proyect)
         .subscribe(() => this.editing = !this.editing);
    } else {
      this.editing = ! this.editing;
    }
  }

  constructor(private proyectService: ProyectService) { }

  ngOnInit() {
  }

}