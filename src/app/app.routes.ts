import { Routes, RouterModule, Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';



const routes: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: 'register' , component: RegisterComponent },

    //*********************
    // LAZY-LOAD
    // Con esto y el resto de modificaciones de app.module, pages.module y shared.module
    // conseguimos que en la pantalla de LOGIN se cargue parte de los modulos y luego el resto
    // optimizando asi la navegacion
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
        // loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)
    },

    // LAZY-LOAD
    //*********************

    { path: '**', pathMatch:'full' ,  component: NopagefoundComponent},

];


export const APP_ROUTES = RouterModule.forRoot(routes,{useHash:true});
