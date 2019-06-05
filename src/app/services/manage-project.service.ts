import {Injectable} from '@angular/core';
import { Project, Vocabulary } from '../domain/operation';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {environment} from '../../environments/environment';
import { SearchResults } from '../domain/extraClasses';

const headerOptions = {
    headers : new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json'),
    withCredentials: true
};

@Injectable()
export class ManageProjectService {

    apiUrl = environment.API_ENDPOINT + '/project/';

    constructor(private http: HttpClient) {}


    addProject(newProject: Project): Observable<Project> {
        const url = `${this.apiUrl}add`;
        console.log(`calling ${url}`);
        return this.http.post<Project>(url, newProject, headerOptions);
    }

    updateProject(project: Project): Observable<Project> {
        const url = `${this.apiUrl}update`;
        console.log(`calling ${url}`);
        return this.http.post<Project>(url, project, headerOptions);
    }

    getAllProjects(from: number, quantity: number): Observable<SearchResults<Project>> {
        const url = `${this.apiUrl}getAll/${from}/${quantity}`;
        console.log(`calling ${url}`);
        return this.http.get<SearchResults<Project>>(url, headerOptions);
    }

    getProjectById(projectId: string): Observable<Project> {
        const url = `${this.apiUrl}getById/${projectId}`;
        console.log(`calling ${url}`);
        return this.http.get<Project>(url, headerOptions);
    }

}
