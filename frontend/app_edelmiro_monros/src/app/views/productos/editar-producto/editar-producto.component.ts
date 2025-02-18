import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

    productoForm = new FormGroup({
      titulo: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      foto: new FormControl('')
    });
  
    constructor(private router: Router) {}
  
    ngOnInit() {
      this.productoForm.setValue({
        titulo: 'Título de ejemplo',
        descripcion: 'Descripción de ejemplo',
        precio: '22',
        foto: ''
      });
    }
  
    onSubmit() {
      console.log(this.productoForm.value);
      this.router.navigate(['/productos']);
    }
  
    cancelar() {
      this.router.navigate(['/productos']);
    }
}
