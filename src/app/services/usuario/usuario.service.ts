import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string = '';

    constructor( public http: HttpClient, public router: Router) {
        //console.log('svc ok!');

        this.cargarStorage();
        
    }
    
    public estaLogueado(){

        return (this.token || '').length > 5 ? true: false;

    }

    private guardarStorage(id: string, token: string, usuario:Usuario){
        localStorage.setItem( 'id', id );
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'usuario', JSON.stringify(usuario) );

        this.usuario=usuario;
        this.token=token;
    }


    private cargarStorage(){
        if(localStorage.getItem('token')){
            this.token = localStorage.getItem('token') || '';
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        }else{
            this.token='';
            this.usuario=null;

        }
    }


    public logout(){
        this.usuario=null;
        this.token = '';

        localStorage.removeItem('usuario');
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
    }

    public loginGoogle( tokenGoogle: string ){
        const url = URL_SERVICIOS + '/login/google';

        return this.http.post(url, {token: tokenGoogle})
            .pipe(map( (resp: any) => {
                
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                
                return true;

            }));
    }

    public login( usuario: Usuario, recuerdame: boolean = false){
        
        if(recuerdame){
            localStorage.setItem('email',usuario.email);
        }else{
            localStorage.removeItem('email');
        }

        let url = URL_SERVICIOS + '/login';

        return this.http.post(url,usuario)
            .pipe(map( (resp: any) => {
                
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                
                return true;

            }));

    }

    public crearUsuario( usuario: Usuario){
        
        let url = URL_SERVICIOS + '/usuario';

        return this.http.post(url,usuario)
            .pipe(map( (resp:any)=>{
                
    
                Swal.fire({
                    title: 'Usuario creado con existo',
                    text: usuario.email,
                    icon: 'success'
                  });
    
                return resp.usuario;
            }));

            // .subscribe( (resp)=>{
            //     console.log('resp',resp);
            // });
    }
}
