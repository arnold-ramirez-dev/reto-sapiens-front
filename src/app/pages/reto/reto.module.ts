import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { SalesRoutingModule } from './reto-routing.module';
import { RetoComponent } from './reto/reto.component';

@NgModule({
	declarations: [RetoComponent],
	imports: [CommonModule, SalesRoutingModule, TemplateModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class RetoModule {}
