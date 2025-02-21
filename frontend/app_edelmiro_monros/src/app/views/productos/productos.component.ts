import { Component, OnInit } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardComponent, RouterModule,  RouterLinkActive, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  public isAdmin$!: Observable<boolean>;
  productos: Productos[] = [];


  constructor(private router: Router, private authService: AuthService) {}
  expandedCardId: number | null = null; 

  toggleExpand(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id; 
  }

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  agregarProducto() {
    this.router.navigate(['/formularioProducto']);
  }

  eliminarProducto(id: number) {
    console.log('Eliminando producto con id:', id);
    this.productos = this.productos.filter((producto) => producto.id !== id);
  }
}
