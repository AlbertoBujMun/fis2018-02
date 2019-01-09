import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {
  myForm: FormGroup;
  constructor(public fb: FormBuilder) { 
    this.myForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      organismo: ['', [Validators.required]],
      investigadorResponsable: ['', [Validators.required]],
      investigadores: ['', [Validators.required]],
      presupuesto: ['', []],
      estado: ['', [Validators.required]],

    });
  }

  ngOnInit() {
  }

  saveData(){
    console.log(this.myForm.value);
  }
}
