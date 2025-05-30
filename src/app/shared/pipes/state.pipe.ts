import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'state'
})
export class StatePipe implements PipeTransform {
	transform(value: boolean): string {
		if (value === null) return 'No existe.';

		return value ? 'Habilitado' : 'Deshabilitado';
	}
}
