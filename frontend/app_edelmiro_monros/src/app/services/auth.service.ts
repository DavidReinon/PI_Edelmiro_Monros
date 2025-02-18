// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //TODO: Cambiar a False en version final
  private isAdminSubject = new BehaviorSubject<boolean>(true);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  setAdminState(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }

  getAdminState(): boolean {
    return this.isAdminSubject.value;
  }
}
