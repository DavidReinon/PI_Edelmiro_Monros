import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
})
export class LoginModalComponent {
  emailOrUsername: string = '';
  password: string = '';

  usuarioInvalido: boolean = false;
  passwordInvalida: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  public abrirModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  public cerrarModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  registrarse(event: Event) {
    event.preventDefault();

    this.usuarioInvalido = false;
    this.passwordInvalida = false;

    if (!this.emailOrUsername || !this.password) return;

    this.usuariosService.getUsuarios().subscribe((usuario) => {
      const usuarioEncontrado = usuario.member.find(
        (u) =>
          u.email === this.emailOrUsername || u.nombre === this.emailOrUsername
      );

      if (!usuarioEncontrado) {
        this.usuarioInvalido = true; // Marcar usuario como inválido
        return;
      }

      if (usuarioEncontrado.contraseña !== this.password) {
        this.passwordInvalida = true; // Marcar contraseña como inválida
        return;
      }

      if (usuarioEncontrado.admin) {
        alert('Bienvenido, Administrador');
        console.log('Inicio de sesión como ADMIN');
        this.authService.login(true);
      } else {
        alert('Inicio de sesión exitoso');
        console.log('Inicio de sesión');
        this.authService.login(false);
      }

      this.cerrarModal();
      this.emailOrUsername = '';
      this.password = '';
    });
  }

  logout() {
    this.authService.logout();
    alert('Sesión cerrada');
  }

  hover = false;
}