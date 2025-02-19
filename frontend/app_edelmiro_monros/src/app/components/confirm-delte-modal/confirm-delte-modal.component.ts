import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-delte-modal',
  imports: [NgStyle],
  templateUrl: './confirm-delte-modal.component.html',
  styleUrl: './confirm-delte-modal.component.css'
})
export class ConfirmDelteModalComponent {
  hover: boolean = false;
  
  abrirModal() {
    const modal = document.getElementById('confirmacionModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  cerrarModal() {
    const modal = document.getElementById('confirmacionModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  confirmarEliminacion() {
    console.log('Elemento eliminado');
    this.cerrarModal();
  }
}
