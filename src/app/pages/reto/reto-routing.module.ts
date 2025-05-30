import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetoComponent } from './reto/reto.component';

const routes: Routes = [
	{
		path: '',
		component: RetoComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SalesRoutingModule {}
