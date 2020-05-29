import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

    constructor( public _usuarioService: UsuarioService, public router: Router){
        
    }

    canActivate(): boolean {

        console.log('pasando por loginguard');

        if(this._usuarioService.estaLogueado()){
            console.log('GUARD OK!!!');

            return true;
        }else{
            console.log('GUARD NOK!!!');

            this.router.navigate(['/login']);

            return false;
        }
    }
  
}
