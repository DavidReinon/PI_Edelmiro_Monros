import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-noticia.component.html',
  styleUrl: './editar-noticia.component.css'
})
export class EditarNoticiaComponent implements OnInit {
  noticiaForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    fecha: new FormControl(''),
    foto: new FormControl('')
  });

  constructor(private router: Router) {}

  ngOnInit() {
    this.noticiaForm.setValue({
      titulo: 'Título de ejemplo',
      descripcion: 'Descripción de ejemplo',
      fecha: '2024-02-15',
      foto: ''
    });
  }

  onSubmit() {
    console.log(this.noticiaForm.value);
    this.router.navigate(['/noticias']);
  }

  cancelar() {
    this.router.navigate(['/noticias']);
  }
} 