import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Image } from '../model/Image';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private remoteServerURL = '//77.55.221.43:8086';
  private runImageDirectory = '/api/getImages/run';
  private walkImageDirectory = '/api/getImages/walk';
  private bikeImageDirectory = '/api/getImages/bike';

  constructor(private http: HttpClient) { }

  getRunHistory(): Observable<Image[]> {
    return this.http.get<Image[]>(this.remoteServerURL + this.runImageDirectory);
  }

  getWalkHistory(): Observable<Image[]> {
    return this.http.get<Image[]>(this.remoteServerURL + this.walkImageDirectory);
  }

  getBikeHistory(): Observable<Image[]> {
    return this.http.get<Image[]>(this.remoteServerURL + this.bikeImageDirectory);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
