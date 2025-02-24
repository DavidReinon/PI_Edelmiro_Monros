// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  login(isAdmin: boolean = false) {
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(isAdmin);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
}
