import { Routes, RouterModule } from '@angular/router';


import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';


const pagesRoutes: Routes = [
    {
        path: '' ,
        component: PagesComponent ,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard' , component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress' , component: ProgressComponent , data: { titulo: 'Progress' } },
            { path: 'graficas1' , component: Graficas1Component , data: { titulo: 'Graficas' } },
            { path: 'account-settings' , component: AccountSettingsComponent , data: { titulo: 'Ajustes' } },
            { path: 'perfil' , component: ProfileComponent , data: { titulo: 'Perfíl' } },
            { path: 'promesas' , component: PromesasComponent , data: { titulo: 'Promesas' } },
            { path: 'rxjs' , component: RxjsComponent , data: { titulo: 'RxJs' } },

            // MANTENIMIENTOS
            { 
                path: 'usuarios' , 
                component: UsuariosComponent , 
                canActivate: [AdminGuard],
                data: { titulo: 'Mantenimiento de usuarios' } 
            },
            { 
                path: 'usuarios/:textoBusqueda' , 
                component: UsuariosComponent , 
                canActivate: [AdminGuard],
                data: { titulo: 'Mantenimiento de usuarios' } 
            },

            { path: 'hospitales' , component: HospitalesComponent , data: { titulo: 'Mantenimiento de hospitales' } },
            { path: 'hospitales/:textoBusqueda' , component: HospitalesComponent , data: { titulo: 'Mantenimiento de hospitales' } },
            { path: 'medicos' , component: MedicosComponent , data: { titulo: 'Mantenimiento de medicos' } },
            { path: 'medico/:id' , component: MedicoComponent , data: { titulo: 'Ficha de medico' } },
            { path: 'busqueda/:textoBusqueda' , component: BusquedaComponent , data: { titulo: 'Buscador' } },

            { path: '', pathMatch:'full' ,  redirectTo: 'dashboard'},
        ]
        
    },

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
