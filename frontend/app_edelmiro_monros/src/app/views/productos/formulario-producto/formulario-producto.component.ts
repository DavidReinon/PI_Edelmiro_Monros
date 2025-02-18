import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent {
  productoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    foto: new FormControl(''),
  });

  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

  public onSubmit() {
    if (this.productoForm.valid) {
      console.log('Formulario válido:', this.productoForm.value);
      const formData: FormData = this.createFormData(this.productoForm.value);
      this.createProducto(formData);
    }
  }
  public cancelar() {
    this.router.navigate(['/productos']);
  }

  private createFormData(formValues: any): FormData {
    const formData = new FormData();
    formData.append('nombre', formValues.nombre || '');
    formData.append('descripcion', formValues.descripcion || '');
    formData.append('precio', formValues.precio || '');
    formData.append('stock', formValues.stock || '');

    const fileInput = formValues.foto;
    if (fileInput) {
      formData.append('foto', fileInput);
    }

    // TODO: Cambiar el usuario por el usuario logeado que estará en el archivo auth.service.ts
    formData.append('usuario', '1');

    return formData;
  }

  private createProducto(formData: FormData) {
    try {
      this.productoService.createProducto(formData).subscribe((response) => {
        console.log('Producto creado:', response);
        alert('Producto creado correctamente');

        this.router.navigate(['/productos']);
      });
    } catch (error) {
      console.log('Error al crear el producto:', error);
    }
  }
}
