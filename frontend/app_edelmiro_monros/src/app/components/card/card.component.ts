import { NgStyle, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-card',
  imports: [NgStyle, AsyncPipe, RouterModule, ConfirmModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  public isAdmin$!: Observable<boolean>;
  showConfirmModal: boolean = false;
   @Input() expandedCards: { [key: string]: boolean } = {};
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  @Input() id: number = 0;
  @Output() onEliminar = new EventEmitter<void>();
  
  isExpanded: boolean = false;

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  expand(title: string) {
    this.expandedCards[title] = !this.expandedCards[title]; 
  }

  editarProducto() {
    console.log('Editando producto con id:', this.id);
    this.router.navigate(['/editar-producto', this.id]);
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
