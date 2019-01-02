import { Injectable } from "@angular/core";
import { Proyecto } from "./proyecto";
import { PROYECTOS } from "./mock-proyectos";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProyectoService {
  serverUrl = "/api/v1";

  constructor(private httpClient: HttpClient) {}

  getProyectos(): Observable<Proyecto[]> {
    const url = this.serverUrl + "/proyectos";
    return this.httpClient.get<Proyecto[]>(url);
  }
}
