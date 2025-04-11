import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContactoModalComponent } from './editar-contacto-modal.component';

describe('EditarContactoModalComponent', () => {
  let component: EditarContactoModalComponent;
  let fixture: ComponentFixture<EditarContactoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContactoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarContactoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
