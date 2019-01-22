import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { deleteCookie, getCookie } from '../domain/cookieUtils';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Attachment } from '../domain/operation';
import { catchError, tap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../environments/environment';

const headerOptions = {
    headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json'),
    withCredentials: true
};

@Injectable()
export class AuthenticationService {

    constructor(private router: Router,
                private http: HttpClient) { }

    private apiUrl: string = environment.API_ENDPOINT;
    private loginUrl: string = environment.API_ENDPOINT + '/user/idp_login?returnTo=' + window.location.origin + '/admin';

    // store the URL so we can redirect after logging in
    public redirectUrl: string;

    private _storage: Storage = sessionStorage;

    isLoggedIn = false;

    public loginWithState() {
        if ( (sessionStorage.getItem('state.location') === undefined) ||
             (sessionStorage.getItem('state.location') === null) ) {
            console.log(`logging in with state. Current url is: ${this.router.url}`);
            sessionStorage.setItem('state.location', this.router.url );
        }
        console.log(`logging in. Current state.location is: ${this.router.url}`);
        console.log(`going to ${this.loginUrl}`);
        window.location.href = this.loginUrl;
    }

    clearSessionAndLoginWithState() {
        let state: string;
        if (sessionStorage.getItem('state.location')) {
            state = sessionStorage.getItem('state.location');
        }
        deleteCookie('arc_currentUser');
        this.isLoggedIn = false;
        this.removeUserProperties();
        console.log('trying to login again');
        if (state) {
            sessionStorage.setItem('state.location', state);
        }
        this.loginWithState();
    }

    public logout() {
        deleteCookie('arc_currentUser');
        this.isLoggedIn = false;
        this.removeUserProperties();

        console.log('logging out');
        /*console.log(`${this.baseUrl}Shibboleth.sso/Logout?return=${window.location.origin}`);
        window.location.href = `${this.baseUrl}Shibboleth.sso/Logout?return=${window.location.origin}`;*/

        /*console.log(`${this.baseUrl}Shibboleth.sso/Logout?return=${window.location.origin}/arc-expenses-service/logout`);
        window.location.href = `${this.baseUrl}Shibboleth.sso/Logout?return=${window.location.origin}/arc-expenses-service/logout`;*/

        console.log(`${this.apiUrl}/logout`);
        window.location.href = `${this.apiUrl}/logout`;

    }

    public tryLogin() {
        console.log('entering tryLogin -> state.location is:', sessionStorage.getItem('state.location'));
        console.log('cookie is:', JSON.stringify(getCookie('arc_currentUser')));
        if (getCookie('arc_currentUser') && (getCookie('arc_currentUser') !== '')) {

            console.log(`I got the cookie!`);

            /* SETTING INTERVAL TO REFRESH SESSION TIMEOUT COUNTER */
            setInterval(() => {
                this.http.get(this.apiUrl + '/user/getUserInfo', headerOptions).subscribe (
                    userInfo => {
                        console.log('User is still logged in');
                        console.log(userInfo);
                        if ( (sessionStorage.getItem('userInfo') === undefined) ||
                             (sessionStorage.getItem('userInfo') === null) ||
                             (this.getUserProp('email') === null ) ) {
                            console.log('received null userInfo');
                            this.isLoggedIn = false;
                            this.removeUserProperties();
                            deleteCookie('arc_currentUser');
                            this.router.navigate(['/home']);
                        }
                    },
                    () => {
                        console.log(`Something went wrong -- I'm logging out!`);
                        /*this.isLoggedIn = false;
                        this.removeUserProperties();
                        deleteCookie('arc_currentUser');
                        this.router.navigate(['/home']);*/
                        this.logout();
                    }
                );
            }, 1000 * 60 * 5);
            /*console.log('email is', this.getUserProp('email'));*/
            if ( !sessionStorage.getItem('userInfo') ) {
                console.log(`session.userInfo wasn't found --> logging in via arc-service!`);
                this.http.get(this.apiUrl + '/user/getUserInfo', headerOptions).subscribe(
                    userInfo => {
                        console.log(JSON.stringify(userInfo));
                        if ( userInfo ) {
                            this.isLoggedIn = true;
                            // TODO: ALWAYS RESTORE ΒEFORE COMMIT!!
                            if (userInfo['user'] && userInfo['user']['email'] &&
                                (userInfo['user']['email'] === 'kkaramal@ipet.athena-innovation.gr')) {
                                sessionStorage.setItem('role', '[{"authority":"ROLE_EXECUTIVE"}]');
                            } else {
                                sessionStorage.setItem('role', JSON.stringify(userInfo['role']));
                                // sessionStorage.setItem('role', '[{"authority":"ROLE_ADMIN"}]');
                            }
                            this.setUserProperties(userInfo['user']);
                        }
                    },
                    error => {
                        console.log('login error!');
                        console.log(error);
                        this.isLoggedIn = false;
                        this.removeUserProperties();
                        deleteCookie('arc_currentUser');
                        this.router.navigate(['/home']);
                    },
                    () => {
                        if ( sessionStorage.getItem('userInfo') ) {
                            console.log(`the current user is: ${this.getUserProp('firstname')}, ` +
                                                             `${this.getUserProp('lastname')}, ` +
                                                             `${this.getUserProp('email')}`);

                            if ( (this.getUserProp('email') === undefined) || (this.getUserProp('email') === null) ) {
                                this.logout();
                            } else if ( (this.getUserProp('firstname') === undefined) ||
                                        (this.getUserProp('firstname') === null) ||
                                        (this.getUserProp('firstname') === 'null') ||
                                        (this.getUserProp('lastname') === undefined) ||
                                        (this.getUserProp('lastname') === null) ||
                                        (this.getUserProp('lastname') === 'null') ) {

                                console.log('in tryLogin navigating to sign-up');
                                this.router.navigate(['/sign-up']);

                            } else {
                                let state: string;
                                if ( sessionStorage.getItem('state.location') ) {
                                    state = sessionStorage.getItem('state.location');
                                    sessionStorage.removeItem('state.location');
                                    console.log(`cleared state.location - returning to state: ${state}`);
                                    this.router.navigateByUrl(state);
                                }
                            }
                        }
                    }
                );
            }
        } /*else if (getCookie('arc_currentUser') && (getCookie('arc_currentUser') === '')) {
            console.log('empty cookie!');
            window.alert('Δεν κατέστη δυνατή η ταυτοποίηση του χρήστη. Παρακαλώ προσπαθήστε ξανά.');
        }*/

    }

    public getIsUserLoggedIn() {
        return (getCookie('arc_currentUser') && (getCookie('arc_currentUser') !== '') &&
                sessionStorage.getItem('userInfo') && (sessionStorage.getItem('userInfo') !== ''));
    }

    public getUserRole() {
        if ( this.getIsUserLoggedIn() &&
             sessionStorage.getItem('role') &&
             (sessionStorage.getItem('role') !== 'null') ) {

            return JSON.parse(sessionStorage.getItem('role'));
        } else {
            return [];
        }
    }

    getUserProp(property: string) {
        if (sessionStorage.getItem('userInfo')) {
            const user = JSON.parse(sessionStorage.getItem('userInfo'));
            if ( user && user[property] && (user[property] !== 'null') ) {

                if ( (property === 'immediateEmails') || (property === 'receiveEmails') ) {
                    return (user[property] === 'true');
                }
                return user[property];
            }
        }
        return null;
    }

    setUserProperties (userInfo: any) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    removeUserProperties () {
        sessionStorage.clear();
    }

}
