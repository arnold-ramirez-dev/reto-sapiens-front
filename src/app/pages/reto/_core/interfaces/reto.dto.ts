export interface DtoCreateCliente {
	nombres: string;
	apellidos: string;
	email: string;
	telefono: string;
}

export interface DtoGetListCliente {
	nombres: string;
	apellidos: string;
	email: string;
	telefono: string;
	id: string;
	fecha_registro: Date;
}

export interface DtoResponseCreateCliente extends DtoCreateCliente {
	id: string;
	fecha_registro: Date;
}
