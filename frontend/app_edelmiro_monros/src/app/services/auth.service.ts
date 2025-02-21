// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(true);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  // Métodos para manejar el estado de administrador
  setAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }
}
