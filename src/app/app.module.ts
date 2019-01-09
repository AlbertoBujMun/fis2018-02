import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { EditableProyectComponent } from './editable-proyect/editable-proyect.component';
import { HttpClientModule } from '@angular/common/http';
import { FormProjectComponent } from './form-project/form-project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectsComponent,
    EditableProyectComponent,
    FormProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
