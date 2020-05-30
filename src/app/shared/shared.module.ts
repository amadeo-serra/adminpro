import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';


// pipes
import { PipesModule } from '../pipes/pipes.module';



import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:[
        RouterModule,
        BrowserModule,
        PipesModule
    ],

    declarations: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],

    exports: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ]
})


export class SharedModule{

}
