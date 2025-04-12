import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioContactoComponent } from './formulario-contacto.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('FormularioContactoComponent', () => {
  let component: FormularioContactoComponent;
  let fixture: ComponentFixture<FormularioContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioContactoComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar inputs para nombre y teléfono', () => {
    const nombreInput = fixture.debugElement.query(
      By.css('input[placeholder="Nombre"]')
    );
    const telefonoInput = fixture.debugElement.query(
      By.css('input[placeholder="Teléfono"]')
    );

    expect(nombreInput).toBeTruthy();
    expect(telefonoInput).toBeTruthy();
  });

  it('no debería emitir si los campos están vacíos', () => {
    spyOn(component.contactoAgregado, 'emit');

    component.nombre = '';
    component.telefono = '';
    component.agregarContacto();

    expect(component.contactoAgregado.emit).not.toHaveBeenCalled();
  });

  it('debería emitir contacto si los campos son válidos', () => {
    spyOn(component.contactoAgregado, 'emit');

    component.nombre = 'Juan';
    component.telefono = '555-1234';
    component.agregarContacto();

    expect(component.contactoAgregado.emit).toHaveBeenCalledWith({
      nombre: 'Juan',
      telefono: '555-1234',
    });
  });
});
