import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDelteModalComponent } from './confirm-delte-modal.component';

describe('ConfirmDelteModalComponent', () => {
  let component: ConfirmDelteModalComponent;
  let fixture: ComponentFixture<ConfirmDelteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDelteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDelteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
