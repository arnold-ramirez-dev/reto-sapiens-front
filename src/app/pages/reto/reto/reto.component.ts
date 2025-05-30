import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DtoGetListCliente } from '../_core/interfaces/reto.dto';
import { RetoService } from '../services/reto.service';

@Component({
	selector: 'app-reto',
	templateUrl: './reto.component.html',
	styleUrls: ['./reto.component.css']
})
export class RetoComponent implements OnInit, AfterViewInit {
	ds: MatTableDataSource<DtoGetListCliente> = new MatTableDataSource<DtoGetListCliente>();
	form!: FormGroup;

	isLoading: boolean = false;

	@ViewChild('matPag') pagDs!: MatPaginator;

	displayedColumns = ['nro', 'nombres', 'apellidos', 'email', 'telefono', 'fecha_registro'];

	constructor(private readonly _RetoService: RetoService, private readonly fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			nombres: [null, [Validators.required, Validators.maxLength(100)]],
			apellidos: [null, [Validators.required, Validators.maxLength(100)]],
			email: [null, [Validators.required, Validators.email, Validators.maxLength(150)]],
			telefono: [null, [Validators.required, Validators.maxLength(50)]]
		});
		this.getList();
	}

	ngAfterViewInit(): void {
		this.ds.paginator = this.pagDs;
	}

	create() {
		if (this.form.invalid) return;

		this.isLoading = true;

		const values = this.form.value;

		this._RetoService
			.create({
				nombres: values.nombres,
				apellidos: values.apellidos,
				email: values.email,
				telefono: values.telefono
			})
			.subscribe({
				next: (res) => {
					if (res == null) {
						alert('ocurrio un error');
						this.isLoading = false;
						this.clear();
						return;
					}

					alert('cliente creado con exito');

					this.clear();
					this.getList();
				},
				error: (err) => {
					console.error(err);
					this.isLoading = false;
					alert('Ocurrió un error en la creación');
				}
			});
	}

	clear() {
		this.form.reset();
		Object.keys(this.form.controls).forEach((key) => {
			const control = this.form.get(key);
			control?.setErrors(null);
			control?.markAsPristine();
			control?.markAsUntouched();
		});
	}

	getList() {
		this.isLoading = true;
		this._RetoService.getList().subscribe((res) => {
			this.ds.data = res;
			this.pagDs.length = res.length;
			this.isLoading = false;
		});
	}
}
