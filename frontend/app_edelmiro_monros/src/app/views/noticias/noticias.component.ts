import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardNoticiasComponent } from '../../components/card-noticias/card-noticias.component';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto: string | null;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CardNoticiasComponent, CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})

export class NoticiasComponent {
  public isAdmin$!: Observable<boolean>;

  constructor(private router: Router, private authService: Auth) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('isAdmin:', isAdmin);
    });
  }

  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Falla eléctrica deja sin luz a miles',
      descripcion:
        'Una avería en la red eléctrica ha provocado un apagón en varias ciudades, afectando a miles de hogares y comercios.',
      fecha: new Date('2024-02-12'),
      foto: 'imagen_apagon.jpg',
    },
    {
      id: 2,
      titulo: 'Falla en servidores afecta servicios bancarios',
      descripcion:
        'Una interrupción en los servidores ha dejado a miles de clientes sin acceso a sus cuentas bancarias en línea.',
      fecha: new Date('2024-02-11'),
      foto: 'imagen_banco.jpg',
    },
    {
      id: 3,
      titulo: 'Falla en el transporte público genera caos',
      descripcion:
        'Un desperfecto técnico en el metro ha causado retrasos y aglomeraciones en varias estaciones principales.',
      fecha: new Date('2024-02-10'),
      foto: 'imagen_metro.jpg',
    },
    {
      id: 4,
      titulo: 'Falla en redes sociales afecta a millones',
      descripcion:
        'Usuarios de distintas partes del mundo reportan problemas para acceder a sus cuentas en redes sociales.',
      fecha: new Date('2024-02-09'),
      foto: 'imagen_redessociales.jpg',
    },
    {
      id: 5,
      titulo: 'Falla en planta de agua deja sin servicio a la ciudad',
      descripcion:
        'Una avería en el sistema de bombeo ha interrumpido el suministro de agua en toda la ciudad, afectando a miles de personas.',
      fecha: new Date('2024-02-08'),
      foto: 'imagen_agua.jpg',
    },
  ];

  agregarNoticia() {
    this.router.navigate(['/noticias/crear']);
  }

  eliminarNoticia(id: number) {
    this.noticias = this.noticias.filter((noticia) => noticia.id !== id);
  }
}
