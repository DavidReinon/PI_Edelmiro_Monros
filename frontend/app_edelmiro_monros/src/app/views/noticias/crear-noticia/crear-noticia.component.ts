import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';

@Component({
  selector: 'app-crear-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent {
  noticiaForm = new FormGroup({
    titulo: new FormControl('', { nonNullable: true }),
    descripcion: new FormControl('', { nonNullable: true }),
    fecha: new FormControl('', { nonNullable: true }),
  });

  public selectedFile: File | null = null;

  constructor(private router: Router, private noticiaService: NoticiasService) { }

  public onSubmit() {
    const rawValue = this.noticiaForm.getRawValue();

    const formData: FormData = new FormData();
    formData.append('titulo', rawValue.titulo);
    formData.append('descripcion', rawValue.descripcion);
    formData.append('fecha', rawValue.fecha);
    formData.append('usuario', 'api/usuarios/1');

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile, this.selectedFile.name);
    }
    console.log('FormData Contenido:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.sendNew(formData);
  }

  private sendNew(formData: FormData) {
    this.noticiaService.crearNoticia(formData).subscribe({
      next: (response) => {
        console.log('Noticia creada', response);
        this.router.navigate(['/noticias']);
      },
      error: (error) => {
        console.error('Error al crear noticia', error);
      }
    });
  }

  public cancelar() {
    this.router.navigate(['/noticias']);
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
