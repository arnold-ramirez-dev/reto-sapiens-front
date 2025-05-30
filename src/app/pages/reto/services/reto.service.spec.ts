import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CLIENTE_URL } from '../_core/config/urls';
import { DtoCreateCliente, DtoResponseCreateCliente } from '../_core/interfaces/reto.dto';
import { RetoService } from './reto.service';

describe('RetoService', () => {
	let service: RetoService;
	let httpMock: HttpTestingController;

	// Configuración antes de cada prueba
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [RetoService]
		});
		service = TestBed.inject(RetoService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('debería crearse correctamente', () => {
		expect(service).toBeTruthy();
	});

	it('debería obtener la lista de clientes', () => {
		const respuestaSimulada = [
			{
				id: '1',
				nombres: 'Juan',
				apellidos: 'Pérez',
				email: 'a@a.com',
				telefono: '999',
				fecha_registro: new Date().toISOString()
			}
		];

		service.getList().subscribe((respuesta) => {
			expect(respuesta.length).toBe(1);
			expect(respuesta[0].nombres).toBe('Juan');
		});

		const solicitud = httpMock.expectOne(CLIENTE_URL);
		expect(solicitud.request.method).toBe('GET');
		solicitud.flush(respuestaSimulada);
	});

	it('debería crear un nuevo cliente', () => {
		const dto: DtoCreateCliente = {
			nombres: 'Juan',
			apellidos: 'Pérez',
			email: 'juan@correo.com',
			telefono: '999888777'
		};

		const respuestaSimulada: DtoResponseCreateCliente = {
			id: 'abc-123',
			nombres: 'Juan',
			apellidos: 'Pérez',
			email: 'juan@correo.com',
			telefono: '999888777',
			fecha_registro: new Date()
		};

		service.create(dto).subscribe((respuesta) => {
			expect(respuesta.id).toBe(respuestaSimulada.id);
			expect(respuesta.nombres).toBe('Juan');
		});

		const solicitud = httpMock.expectOne(CLIENTE_URL);
		expect(solicitud.request.method).toBe('POST');
		expect(solicitud.request.body).toEqual(dto);
		solicitud.flush(respuestaSimulada);
	});
});
