import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true
})
export class CardComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  isExpanded: boolean = false;

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }
}
