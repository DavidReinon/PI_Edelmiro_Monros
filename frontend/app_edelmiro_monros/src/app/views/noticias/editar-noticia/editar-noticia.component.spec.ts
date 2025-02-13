import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarNoticiaComponent } from './editar-noticia.component';

describe('EditarNoticiaComponent', () => {
  let component: EditarNoticiaComponent;
  let fixture: ComponentFixture<EditarNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 