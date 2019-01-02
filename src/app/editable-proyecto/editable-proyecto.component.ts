import { Component, OnInit, Input } from "@angular/core";
import { Proyecto } from "../proyecto";

@Component({
  selector: "[app-editable-proyecto]",
  templateUrl: "./editable-proyecto.component.html",
  styleUrls: ["./editable-proyecto.component.css"]
})
export class EditableProyectoComponent implements OnInit {
  @Input() proyecto: Proyecto;
  editable = false;

  constructor() {}

  onEdit() {
    this.editable = !this.editable;
  }

  ngOnInit() {}
}
