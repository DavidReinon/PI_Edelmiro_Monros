import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Productos } from '../../../models/productos.interfaces';
import { LoadingService } from '../../../services/loading.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent {
  productoForm = new FormGroup({
    nombre: new FormControl('', { nonNullable: true }),
    descripcion: new FormControl('', { nonNullable: true }),
    precio: new FormControl(null, Validators.min(0)),
    stock: new FormControl(null, Validators.min(0)),
    foto: new FormControl(''),
  });

  public isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.productoForm.patchValue({ foto: base64String.split(',')[1] });
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  async onSubmit() {
    try {
      this.loadingService.show();
      const rawValue = this.productoForm.getRawValue();

      const payload: Productos = {
        nombre: rawValue.nombre,
        descripcion: rawValue.descripcion,
        precio: rawValue.precio,
        stock: rawValue.stock,
        usuarioId: 1,
        foto: rawValue.foto ? rawValue.foto : null,
      };
      console.log(payload);

      await this.productoService.createProducto(payload);
      this.router.navigate(['/productos']);
    } finally {
      this.loadingService.hide();
    }
  }

  public cancelar() {
    this.router.navigate(['/productos']);
  }
}
