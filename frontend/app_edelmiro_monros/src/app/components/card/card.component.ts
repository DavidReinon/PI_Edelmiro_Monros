import { NgStyle, NgIf, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [NgStyle, NgIf, AsyncPipe, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true
})
export class CardComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  @Input() isAdmin: Observable<boolean> | null = null;
  @Input() id: number = 0;
  @Output() onEliminar = new EventEmitter<void>();
  
  isExpanded: boolean = false;

  constructor(private router: Router) {}

  expand() {
    this.isExpanded = !this.isExpanded;
  }

  editarProducto() {
    console.log('Editando producto con id:', this.id);
    this.router.navigate(['editar-producto', this.id]);
  }
  eliminarProducto() {
    this.onEliminar.emit();
  }
}
