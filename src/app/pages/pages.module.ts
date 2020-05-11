import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from '../pages/pages.routes';

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonutComponent } from '../components/grafica-donut/grafica-donut.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficaDonutComponent
    ],

    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficaDonutComponent
    ],

    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
      ],
})


export class PagesModule{

}