import { NgModule } from "@angular/core";

// LAZY-LOAD ??
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// LAZY-LOAD


// pipes
import { PipesModule } from '../pipes/pipes.module';



import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    imports:[
        RouterModule,

        // LAZY-LOAD ??
        // BrowserModule,
        CommonModule,
        // LAZY-LOAD


        PipesModule
    ],

    declarations: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,

        // añado por LAZY-LOAD
        ModalUploadComponent
    ],

    exports: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,

        // añado por LAZY-LOAD
        ModalUploadComponent
    ]
})


export class SharedModule{

}
