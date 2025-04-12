import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditarContactoModalComponent } from './editar-contacto-modal.component';

describe('EditarContactoModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContactoModalComponent], // standalone component
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 1, nombre: 'Juan', telefono: '123' },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EditarContactoModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
