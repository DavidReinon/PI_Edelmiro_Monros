import { NgStyle, NgIf, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-card',
  imports: [NgStyle, NgIf, AsyncPipe, RouterModule, ConfirmModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  public isAdmin$!: Observable<boolean>;
  showConfirmModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  @Input() id: number = 0;
  @Output() onEliminar = new EventEmitter<void>();
  
  isExpanded: boolean = false;

  expand() {
    this.isExpanded = !this.isExpanded;
  }

  editarProducto() {
    console.log('Editando producto con id:', this.id);
    this.router.navigate(['editar-producto', this.id]);
  }

  confirmarEliminar() {
    this.showConfirmModal = true;
  }

  eliminarProducto() {
    this.onEliminar.emit();
    this.showConfirmModal = false;
  }

  cancelarEliminar() {
    this.showConfirmModal = false;
  }
}
