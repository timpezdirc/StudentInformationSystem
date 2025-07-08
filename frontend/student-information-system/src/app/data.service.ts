import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = 'http://localhost:3000/api'

  constructor(private readonly http: HttpClient) { }

  public getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${id}`);
  }

  public getStudents(): Observable<any> {
    const url = `${this.apiUrl}/students`;
    return this.http.get(url);
  }

  public addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  public updateStudentCourses(id: string, courses: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/students/${id}`, { courses });
  }

  public deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${id}`);
  }
}
