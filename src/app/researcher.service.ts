import { Injectable } from '@angular/core';
import { Researcher } from './researcher';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  private researchersUrl = 'https://fis2018-01.herokuapp.com/api/v1'
  private apikey = '9806869c-22f0-4834-8025-77607ad275f6';

  constructor(
    private http: HttpClient
  ) { }

  private log(message: string) {
    console.log(`ResearcherService: ${message}`);
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

  getResearchers(): Observable<Researcher[]> {
    const url = `${this.researchersUrl}/researchers?apikey=${this.apikey}`;
    return this.http.get<Researcher[]>(url)
      .pipe(
          tap(() => this.log('fetched Researchers')),
          catchError(this.handleError('getResearchers', []))
      );
  }

  getResearcher(dni : String): Observable<Researcher[]> {
    const url = `${this.researchersUrl}/researchers/${dni}?apikey=${this.apikey}`;
    return this.http.get<Researcher[]>(url)
      .pipe(
          tap(() => this.log('fetched Researchers')),
          catchError(this.handleError('getResearchers', []))
      );
  }

}
