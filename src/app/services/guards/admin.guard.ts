import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        public _usuarioService: UsuarioService,
        public router: Router
    ){

    }

    canActivate() {
        console.log('adminGuard!!!');


        if(this._usuarioService.usuario.role==='ADMIN_ROLE'){
            return true;
        }else{
            console.log('BLOQUEADO POR ADMIN GUARD');
            this.router.navigate(['/login']);
            return false;
        }
    }
  
}