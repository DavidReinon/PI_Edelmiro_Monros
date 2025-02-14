import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage: string = '';
  loading: boolean = false;

  constructor(public authService: AuthService) {}

  async onSubmit() {
    if (this.loading) return;

    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.loading = true;
      this.errorMessage = '';

      try {
        const success = await this.authService.login(username, password);
        if (success) {
          console.log('Login exitoso');
          this.loginForm.reset();
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      } catch (error) {
        this.errorMessage = 'Error al intentar iniciar sesión';
      } finally {
        this.loading = false;
      }
    }
  }

  close() {
    this.authService.closeModal();
    this.errorMessage = '';
    this.loginForm.reset();
  }
} 