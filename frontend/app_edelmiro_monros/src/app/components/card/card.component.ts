import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  public isAdmin$!: Observable<boolean>;

  constructor(private authService: Auth) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
  }
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() photo: string = '';
  @Input() price: number = 0;
  isExpanded: boolean = false;

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}
