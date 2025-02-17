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
    foto: new FormControl('', { nonNullable: false }) 
  });

  constructor(private router: Router, private noticiasService: NoticiasService) { }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(input.files[0])
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.noticiaForm.patchValue({ foto: base64String.split(',')[1] }); 
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  
  public onSubmit() {
    const rawValue = this.noticiaForm.getRawValue();

    const payload = {
      titulo: rawValue.titulo,
      descripcion: rawValue.descripcion,
      fecha: rawValue.fecha,
      usuario: '/api/usuarios/1',
      foto: rawValue.foto ? rawValue.foto : null
    };
    console.log(payload)

    this.noticiasService.crearNoticia(payload).subscribe({
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
}
