<<<<<<< HEAD
import { NgStyle, NgIf, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
=======
import { NgStyle, NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Auth } from '../../services/auth.service';
>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-card',
  imports: [NgStyle, CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  public isAdmin$!: Observable<boolean>;

<<<<<<< HEAD
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
=======
  constructor(private router: Router, private authService: Auth) {}

>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7
  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
  }
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  @Input() isAdmin: Observable<boolean> | null = null;
  @Input() id: number = 0;
<<<<<<< HEAD
  @Output() onEliminar = new EventEmitter<void>();
  
  isExpanded: boolean = false;

 
=======

  isExpanded: boolean = false;

>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7
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
