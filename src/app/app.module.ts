import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ProyectosComponent } from "./proyectos/proyectos.component";
import { EditableProyectoComponent } from "./editable-proyecto/editable-proyecto.component";

@NgModule({
  declarations: [AppComponent, ProyectosComponent, EditableProyectoComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
