import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ContactUsMail } from '../domain/operation';

const headerOptions = {
    headers : new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json'),
    withCredentials: true
};

@Injectable()
export class ManageUserService {

    constructor(private http: HttpClient) {}


  sendContactFormToService(params: ContactUsMail): Observable<any> {
    const url = `${environment.API_ENDPOINT}/contactUs/sendMail`;
    console.log(`calling ${url}`);
    console.log(`sending ${JSON.stringify(params)}`);

    return this.http.post<any>(url, JSON.stringify(params), headerOptions);
  }

}
