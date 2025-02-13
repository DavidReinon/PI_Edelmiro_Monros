import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';

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
    event.preventDefault(); // Evita el recargo de la página

    if (this.email && this.password) {
      console.log('Usuario registrado con éxito:');
      console.log('Email:', this.email);
      console.log('Contraseña:', this.password);
      alert('Registro exitoso');
      this.cerrarModal();
      this.email = '';
      this.password = '';
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}
