import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-cliente',
  imports: [NgClass, NgStyle],
  templateUrl: './card-cliente.component.html',
  styleUrl: './card-cliente.component.css'
})
export class CardClienteComponent {
  @Input() Nombre: string = 'My title';
  @Input() photo : string = 'url(https://frutasolivar.com/wp-content/uploads/2019/02/rawpixel-603025-unsplash-e1579691765526.jpg)';
  @Input() comentario: string = 'This is a description';
  @Input() valoracion: number = 5;
  @Input() fecha: Date = new Date(2005, 4, 12); 



}
