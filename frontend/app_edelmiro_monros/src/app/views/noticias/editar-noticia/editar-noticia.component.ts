import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';
import { NoticiasStateService } from '../../../services/noticias-state.service';
import { Noticias } from '../../../models/noticias.interfaces';
import { CrearNoticiaComponent } from '../crear-noticia/crear-noticia.component';

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

  constructor(
    private router: Router,
    public noticiasService: NoticiasService,
    public stateService: NoticiasStateService,
    public crearNoticia: CrearNoticiaComponent
  ) { }

  public ngOnInit(): void {
    let noticia: Noticias = this.stateService.getNoticia()
    console.log(noticia)
    if (noticia) {
      this.noticiaForm.setValue({
        titulo: noticia.titulo,
        descripcion: noticia.descripcion,
        fecha: noticia.fecha,
        foto: null
      });
    } else {
      this.noticiaForm.setValue({
        titulo: 'Título de ejemplo',
        descripcion: 'Descripción de ejemplo',
        fecha: '2024-02-15',
        foto: ''
      });
    }
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
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

  public onSubmit(): void {
    console.log(this.noticiaForm.value);

    const rawValue = this.noticiaForm.getRawValue();
    const date = new Date(rawValue.fecha);
    const fechaISO = date.toISOString();

    const payload = {
      titulo: rawValue.titulo,
      descripcion: rawValue.descripcion,
      fecha: fechaISO,
      usuario: '1',
      foto: rawValue.foto ? rawValue.foto : null
    };
    console.log(payload)

    this.noticiasService.postNoticia(payload).subscribe({
      next: (response) => {
        console.log('Noticia creada', response);
        this.router.navigate(['/noticias']);
      },
      error: (error) => {
        console.error('Error al crear noticia', error);
      }
    });
  }

  public cancelar(): void {
    this.router.navigate(['/noticias']);
  }
} 