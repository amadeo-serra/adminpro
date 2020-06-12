import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

//Modulos
import { PagesModule } from './pages/pages.module';

//Servicios
import { ServiceModule } from './services/service.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    // añado por LAZY-LOAD
    PagesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    APP_ROUTES,
    // quito por LAZY-LOAD
    //PagesModule,

    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    // LAZY-LOAD. Como hemos pasado a este modulo el PagesComponent tambien debo importar el SharedModule
    SharedModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
