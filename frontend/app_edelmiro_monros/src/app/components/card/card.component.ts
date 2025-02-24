import { NgStyle, AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ProductosStateService } from '../../services/productos-state.service';
import { Productos } from '../../models/productos.interfaces';

@Component({
  selector: 'app-card',
  imports: [NgStyle, CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  showConfirmModal: boolean = false;

  @Input() expandedCards: { [key: string]: boolean } = {};
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  @Input() id: number = 0;
  @Input() stock: number = 0;
  @Input() usuario: number = 0;
  @Input() isAdmin: boolean = false;
  @Output() onEliminar = new EventEmitter<void>();
  

 

  public apiUrl: string = 'http://44.214.111.49' /* 'http://127.0.0.1:8000' */;

  constructor(private router: Router, public service: ProductosStateService) { }

  

  public editarProducto(producto: Productos) {
    console.log('Editando producto con id:', this.id);
    this.service.setProducto(producto)
    this.router.navigate(['/editar-producto', this.id]);
  }

  public confirmarEliminar() {
    this.showConfirmModal = true;
  }

  public eliminarProducto() {
    this.onEliminar.emit();
    this.showConfirmModal = false;
  }

  public cancelarEliminar() {
    this.showConfirmModal = false;
  }
}
