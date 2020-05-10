import { Routes, RouterModule } from '@angular/router';


import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';


const pagesRoutes: Routes = [
    {
        path: '' ,
        component: PagesComponent ,
        children: [
            { path: 'dashboard' , component: DashboardComponent },
            { path: 'progress' , component: ProgressComponent },
            { path: 'graficas1' , component: Graficas1Component },
            { path: '', pathMatch:'full' ,  redirectTo: 'dashboard'},
        ]
        
    },

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
