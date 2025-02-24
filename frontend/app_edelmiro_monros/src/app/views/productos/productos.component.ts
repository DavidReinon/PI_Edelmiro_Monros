import { Component, OnInit } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardComponent, RouterModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  public isAdmin$!: Observable<boolean>;
  productos: Productos[] = [];

  constructor(private router: Router, private authService: AuthService, public service: ProductoService) { }

  public ngOnInit() {
    this.getProductos()
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('Estado de admin:', isAdmin);
    });
  }

  public getProductos(): void {
    this.productos = []
    this.service.getProductos().subscribe((response) => {
      this.productos = response
    });
  }

  public agregarProducto() {
    this.router.navigate(['/formularioProducto']);
  }

  public eliminarProducto(id: number) {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('Estado de admin:', isAdmin);
    });
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.service.deleteProducto(id).subscribe(() => {
      this.productos = this.productos.filter(producto => producto.id !== id);
    });
  }

}
