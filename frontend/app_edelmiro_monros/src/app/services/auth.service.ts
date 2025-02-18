// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  setAdminState(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }

  getAdminState(): boolean {
    return this.isAdminSubject.value;
  }
}
