import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  
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
  
  emailOrUsername: string = '';
  password: string = '';

  registrarse(event: Event) {
    event.preventDefault();

    if (this.emailOrUsername && this.password) {
      // Validación: comprobar si es un correo electrónico o un nombre de usuario
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(this.emailOrUsername);

      if (isEmail) {
        console.log("Usuario registrado:");
        console.log("Correo Electrónico:", this.emailOrUsername);
      } else {
        console.log("Usuario registrado:");
        console.log("Nombre de Usuario:", this.emailOrUsername);
      }

      console.log("Contraseña:", this.password);
      alert("Registro exitoso");

      this.cerrarModal();
      this.emailOrUsername = "";
      this.password = "";
    } else {
      alert("Por favor, completa todos los campos");
    }
  }

  hover = false;

}
