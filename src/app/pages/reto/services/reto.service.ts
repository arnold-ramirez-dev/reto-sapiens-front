import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENTE_URL } from '../_core/config/urls';
import { DtoCreateCliente, DtoGetListCliente, DtoResponseCreateCliente } from '../_core/interfaces/reto.dto';

@Injectable({
	providedIn: 'root'
})
export class RetoService {
	constructor(private readonly _http: HttpClient) {}

	public getList(): Observable<DtoGetListCliente[]> {
		return this._http.get<DtoGetListCliente[]>(`${CLIENTE_URL}`);
	}

	public create(dto: DtoCreateCliente): Observable<DtoResponseCreateCliente> {
		return this._http.post<DtoResponseCreateCliente>(`${CLIENTE_URL}`, dto);
	}
}
