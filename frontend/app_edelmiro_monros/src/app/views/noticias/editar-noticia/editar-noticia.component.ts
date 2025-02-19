import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto: string | null;
}

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

  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Falla eléctrica deja sin luz a miles',
      descripcion: 'Una avería en la red eléctrica ha provocado un apagón en varias ciudades, afectando a miles de hogares y comercios.',
      fecha: new Date('2024-02-12'),
      foto: 'imagen_apagon.jpg',
    },
    {
      id: 2,
      titulo: 'Falla en servidores afecta servicios bancarios',
      descripcion: 'Una interrupción en los servidores ha dejado a miles de clientes sin acceso a sus cuentas bancarias en línea.',
      fecha: new Date('2024-02-11'),
      foto: 'imagen_banco.jpg',
    },
    {
      id: 3,
      titulo: 'Falla en el transporte público genera caos',
      descripcion: 'Un desperfecto técnico en el metro ha causado retrasos y aglomeraciones en varias estaciones principales.',
      fecha: new Date('2024-02-10'),
      foto: 'imagen_metro.jpg',
    },
    {
      id: 4,
      titulo: 'Falla en redes sociales afecta a millones',
      descripcion: 'Usuarios de distintas partes del mundo reportan problemas para acceder a sus cuentas en redes sociales.',
      fecha: new Date('2024-02-09'),
      foto: 'imagen_redessociales.jpg',
    },
    {
      id: 5,
      titulo: 'Falla en planta de agua deja sin servicio a la ciudad',
      descripcion: 'Una avería en el sistema de bombeo ha interrumpido el suministro de agua en toda la ciudad, afectando a miles de personas.',
      fecha: new Date('2024-02-08'),
      foto: 'imagen_agua.jpg',
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', id);
    const noticia = this.noticias.find(n => n.id === id);
    console.log('Noticia encontrada:', noticia);
    
    if (noticia) {
      this.noticiaForm.patchValue({
        titulo: noticia.titulo,
        descripcion: noticia.descripcion,
        fecha: noticia.fecha.toISOString().split('T')[0],
        foto: noticia.foto
      });
    }
  }

  onSubmit() {
    console.log(this.noticiaForm.value);
    this.router.navigate(['/noticias']);
  }

  cancelar() {
    this.router.navigate(['/noticias']);
  }
} 