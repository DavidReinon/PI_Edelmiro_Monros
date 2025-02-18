// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
=======
export class Auth {
  //TODO: Cambiar a False en version final
  private isAdminSubject = new BehaviorSubject<boolean>(true);
>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  // Métodos para manejar el estado de administrador
  setAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }
}
