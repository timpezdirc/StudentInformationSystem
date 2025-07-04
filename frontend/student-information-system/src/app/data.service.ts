import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = 'http://localhost:3000/api'

  constructor(private readonly http: HttpClient) { }

  public getStudents(): Observable<any> {
    const url = `${this.apiUrl}/students`;
    return this.http.get(url);
  }
}
