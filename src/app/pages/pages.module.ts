import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from '../pages/pages.routes';

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

// pipes
import { PipesModule } from '../pipes/pipes.module';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonutComponent } from '../components/grafica-donut/grafica-donut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficaDonutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent
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
        ChartsModule,
        PipesModule,
        BrowserModule
      ],
})


export class PagesModule{

}