import { Injectable } from '@angular/core';
import { Proyect } from './proyect';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private proyectsUrl = window.location.origin+'/api/v1';
  private apikey = '11165da8-c45d-4cb3-95c4-6fa13939f7a5';

  constructor(
    private http: HttpClient
  ) { }

  /** Log a ProyectService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`ProyectService: ${message}`);
    console.log(`ProyectService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getProyects(): Observable<Proyect[]> {
    const url = `${this.proyectsUrl}/proyects?apikey=${this.apikey}`;
    return this.http.get<Proyect[]>(url)
      .pipe(
          tap(() => this.log('fetched proyects')),
          catchError(this.handleError('getProyects', []))
      );
  }

  addProyect(proyect: Proyect): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.proyectsUrl}/proyects?apikey=${this.apikey}`;
    return this.http.post(url, proyect, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`add proyect id =${proyect.id}`)),
          catchError(this.handleError('addProyect', []))
      );
  }

  updateProyect(proyect: Proyect): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const url = `${this.proyectsUrl}/proyects/${proyect.id}?apikey=${this.apikey}`;
    return this.http.put(url, proyect, {responseType: 'text', headers: headers})
        .pipe(
          tap(() => this.log(`updated proyect id=${proyect.id}`)),
          catchError(this.handleError('updateProyect', []))
      );    
  }

  deleteProyect(proyect: Proyect): Observable<Proyect[]> {
    const url = `${this.proyectsUrl}/proyects/${proyect.id}$?apikey=${this.apikey}`;
    return this.http.delete<Proyect[]>(url)
      .pipe(
          tap(() => this.log('Fetched Project')),
          catchError(this.handleError('deleteProyec', []))
      );
  }


}