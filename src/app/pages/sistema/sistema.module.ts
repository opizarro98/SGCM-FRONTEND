import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { SistemaRoutes } from './sistema.routing';
import { CitasComponent } from './citas/citas.component';
import { HistoriaComponent } from './historia/historia.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SistemaRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatButtonModule,
    MatDialogModule,
    MatPaginator,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDividerModule,
  ],
  declarations: [
    CitasComponent,
    HistoriaComponent,
    DiagnosticoComponent,

  ],
})
export class SistemaModule { }
