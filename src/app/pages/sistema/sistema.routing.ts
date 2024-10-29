import { Routes } from '@angular/router';

// pages
import { CitasComponent } from './citas/citas.component';
import { HistoriaComponent } from './historia/historia.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';
import { PersonaComponent } from './persona/persona.component';

export const SistemaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'citas',
        component: CitasComponent,

      },
      {
        path: 'historia',
        component: HistoriaComponent,

      },
      {
        path: 'diagnostico',
        component: DiagnosticoComponent,

      },
      {
        path: 'persona',
        component: PersonaComponent,

      },
    ],
  },
];
