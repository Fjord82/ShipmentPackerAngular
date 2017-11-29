import { Injectable } from '@angular/core';
import {Project} from "./project.model";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from "../../../../environments/environment";

const url = environment.apiEndpoint + '/projects';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this.http
      .post<Project>(url, project);
  }

  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(url);
  }

  getById(id: number): Observable<Project> {
    return this.http
      .get<Project>(url + '/' + id);
  }

  delete(id: number): Observable<Project> {
    return this.http
      .delete<Project>(url + '/' + id);
  }

  update(project: Project): Observable<Project> {
    return this.http.put(url + '/' + project.Id, project);
  }



}
