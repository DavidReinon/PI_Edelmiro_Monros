import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, Output,EventEmitter} from '@angular/core';
import { RatingStarComponent } from '../../rating-star/rating-star.component';

@Component({
  selector: 'app-card-cliente',
  imports: [NgClass, NgStyle, RatingStarComponent],
  templateUrl: './card-cliente.component.html',
  styleUrl: './card-cliente.component.css'
})
export class CardClienteComponent {
  @Input() Nombre: string = 'My title';
  @Input() comentario: string = 'This is a description';
  @Input() valoracion: number = 3;
 @Input() fecha: Date = new Date('2005-05-12');


  @Output() valoracionChange = new EventEmitter<number>(); 

  ngOnInit() {
    this.valoracionChange.emit(this.valoracion); 
  }

}
