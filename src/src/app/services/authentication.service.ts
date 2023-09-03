import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Auth {
  username: string;
  password: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  isLoggedIn: boolean = false;
  baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) {
    const currentUser: any = sessionStorage.getItem('authToken');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(currentUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userObj: any) {
    return this.http.get(`${this.baseURL}/login`, userObj)
      .pipe(map((user: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.isLoggedIn = true;
        sessionStorage.setItem('authToken', JSON.stringify(user?.token));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.currentUserSubject.unsubscribe();
    this.router.navigate(['login']);
  }
}