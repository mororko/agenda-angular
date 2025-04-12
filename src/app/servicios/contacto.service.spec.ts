import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContactoService, Contacto } from './contacto.service';

describe('ContactoService', () => {
  let service: ContactoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactoService],
    });

    service = TestBed.inject(ContactoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no queden requests colgando
  });

  it('debería obtener contactos desde la API', () => {
    const contactosMock: Contacto[] = [
      { id: 1, nombre: 'Ana', telefono: '123' },
      { id: 2, nombre: 'Luis', telefono: '456' },
    ];

    service.cargarContactosDesdeAPI();

    // Capturamos todas las peticiones GET (puede haber más de una)
    const getReqs = httpMock.match('http://localhost:3000/contactos');

    // Solo respondemos la última (la más reciente suele ser la buena)
    getReqs[getReqs.length - 1].flush(contactosMock);

    service.getContactos().subscribe((contactos) => {
      expect(contactos.length).toBe(2);
      expect(contactos).toEqual(contactosMock);
    });
  });

  it('debería agregar un contacto y recargar la lista', () => {
    const nuevo: Contacto = { nombre: 'Nuevo', telefono: '999' };

    service.agregarContacto(nuevo); // Esto hace un POST y luego un GET

    const postReq = httpMock.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/contactos',
    });
    postReq.flush({ id: 99, ...nuevo });

    const getReqs = httpMock.match('http://localhost:3000/contactos');
    // Respondemos la última llamada GET
    getReqs[getReqs.length - 1].flush([{ id: 99, ...nuevo }]);
  });
});
