import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../models/usuario.interfaz';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  
  emailOrUsername: string = '';
  password: string = '';

  constructor(private usuariosService: UsuariosService, private authService: AuthService) {}

  abrirModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.add('show'); 
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  cerrarModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.remove('show'); 
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
  
  registrarse(event: Event) {
    event.preventDefault();

    if (!this.emailOrUsername || !this.password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // URL de la API (ajustar según tu backend)
    const apiUrl = 'http://44.214.111.49/api/usuarios';

    this.usuariosService.getUsuarios(apiUrl).subscribe((usuario) => {
      const usuarioEncontrado = usuario.member.find(
        (u) =>
          (u.email === this.emailOrUsername || u.nombre === this.emailOrUsername) &&
          u.contraseña === this.password
      );

      if (usuarioEncontrado) {
        if (usuarioEncontrado.admin) {
          alert("Bienvenido, Administrador");
          console.log("Inicio de sesión como ADMIN");
          this.authService.login(true);
        } else {
          alert("Inicio de sesión exitoso");
          console.log("Inicio de sesión como usuario normal");
          this.authService.login(false);
        }

        this.cerrarModal();
        this.emailOrUsername = '';
        this.password = '';
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
  
  hover = false;

}
