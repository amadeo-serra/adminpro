import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

    constructor(
        public _usuarioService: UsuarioService,
        public router: Router
    ){
        // console.log('constr de verificaTokenGuard');
    }

    canActivate(): Promise<boolean> | boolean {

        console.log('verficatoken!!');

        let token = this._usuarioService.token;

        let payload = JSON.parse( atob(token.split('.')[1]) );
        
        let expirado = this.tokenExpirado(payload.exp);

        if(expirado){
            console.log('TOKEN EXPIRADO!!!');
            this.router.navigate(['/login']);
            return false;
        }

        // this.verificaRenovacionToken( payload.exp)
        //     .then( result=>{
        //         this._usuarioService.renuevaToken()
        //             .subscribe( resp=>{
        //                 console.log('TOKEN RENOVADO:', resp);
        //             })
                
        //     });

        return this.verificaRenovacionToken( payload.exp);
    }

    public verificaRenovacionToken( fechaExp: number ): Promise<boolean>{

        return new Promise( (resolve,reject)=>{
            
            const caducidadToken = new Date(fechaExp * 1000);
            const limiteRenovacion = new Date();
            

            // sumo 1 horas al momento actual
            limiteRenovacion.setTime( limiteRenovacion.getTime() + (4 * 60 * 60 * 1000) );
            console.log('ahora + X horas',limiteRenovacion);

            if(limiteRenovacion.getTime()>caducidadToken.getTime()){

                this._usuarioService.renuevaToken()
                    .subscribe( resp=>{
                        console.log('TOKEN RENOVADO:', resp);
                        resolve(true);
                    },
                    (err)=>{
                        console.log('ERROR AL RENOVAR TOKEN:', err);
                        this.router.navigate(['/login']);
                        reject(false);
                    }
                );

            }else{
                resolve(true);
            }
        });

    }

    public tokenExpirado(fechaExp: number){
        const ahora = new Date().getTime()/1000;

        if (fechaExp < ahora ){
            return true;
        }

        return false;
    }
    
  
}
