import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarContactoModalComponent } from './eliminar-contacto-modal.component';

describe('EliminarContactoModalComponent', () => {
  let component: EliminarContactoModalComponent;
  let fixture: ComponentFixture<EliminarContactoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarContactoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarContactoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
