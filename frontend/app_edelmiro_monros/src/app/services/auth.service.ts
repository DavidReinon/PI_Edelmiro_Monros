import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdmin: boolean = false;
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<LoginResponse>('http://localhost:8000/api/login', {
        username,
        password
      }).toPromise();

      if (response?.success) {
        this.isAdmin = true;
        this.showModal = false;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  logout() {
    this.isAdmin = false;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
} 