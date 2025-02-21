import { Component, OnInit } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardComponent, RouterModule, RouterLinkActive, CommonModule, LoadingComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  // Propiedades públicas
  public isAdmin$!: Observable<boolean>;
  public productos: Productos[] = [];
  public expandedCardId: number | null = null;
  public isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private productoService: ProductoService
  ) {
    // Inicializamos isLoading$ en el constructor
    this.isLoading$ = this.loadingService.isLoading$;
  }

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.cargarProductos();
  }

  // Métodos privados de utilidad
  private async handleOperation<T>(operation: () => Promise<T>): Promise<T | null> {
    try {
      this.loadingService.show();
      return await operation();
    } catch (error) {
      console.error('Error en la operación:', error);
      return null;
    } finally {
      this.loadingService.hide();
    }
  }

  // Métodos públicos
  public async cargarProductos(): Promise<void> {
    await this.handleOperation(async () => {
      const productos = await firstValueFrom(this.productoService.getProductos());
      this.productos = productos;
    });
  }

  public toggleExpand(id: number): void {
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }

  public async eliminarProducto(id: number): Promise<void> {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }
    
    await this.handleOperation(async () => {
      await this.productoService.deleteProducto(id);
      await this.cargarProductos();
    });
  }

  public async agregarProducto(): Promise<void> {
    await this.handleOperation(async () => {
      await this.router.navigate(['/formularioProducto']);
    });
  }

  public async editarProducto(id: number): Promise<void> {
    await this.handleOperation(async () => {
      await this.router.navigate(['/editar-producto', id]);
    });
  }
}
