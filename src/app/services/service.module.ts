import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,SidebarService,SharedService, MedicoService, AdminGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './usuario/usuario.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
      SettingsService,
      SidebarService,
      SharedService,
      // Aunque no los incluya aqui me funciona todo bien...lo pongo porque lo ponen en el curso
      UsuarioService,
      LoginGuardGuard,
      AdminGuard,
      SubirArchivoService,
      ModalUploadService,
      HospitalService,
      MedicoService
  ]
})

export class ServiceModule { }
