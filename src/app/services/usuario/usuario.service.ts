import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string = '';

    constructor(public http: HttpClient, 
                public router: Router,
                public _subirArchivo: SubirArchivoService) {
        //console.log('svc ok!');

        this.cargarStorage();
        
    }
    
    public estaLogueado(){
        
        //console.log('ESTA LOGUEADO???. TOKEN: ', this.token);

        if(this.token===null){
            console.log('NO tenemos token: NULL');
            return false;
        }else if(this.token===undefined){
            console.log('NO tenemos token: undefined');
            return false;
        }else if(this.token==='undefined'){
            console.log('NO tenemos token: "undefined"');
            return false;
        }

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
                    title: 'Usuario creado con exito',
                    text: usuario.email,
                    icon: 'success'
                  });
    
                return resp.usuario;
            }));

            // .subscribe( (resp)=>{
            //     console.log('resp',resp);
            // });
    }

    public actualizarUsuario(usuario:Usuario){
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;

        return this.http.put(url,usuario,{headers: {token:this.token}})
            .pipe(map( (resp:any)=>{
                
    
                Swal.fire({
                    title: 'Usuario actualizado con exito',
                    text: usuario.email,
                    icon: 'success'
                });

                this.guardarStorage(resp.usuario.id, this.token, resp.usuario);
    
                return resp.usuario;
            }));

            // .subscribe( (resp)=>{
            //     console.log('resp',resp);
            // });
    }

    public cambiarImagen(archivo: File, id: string){

        this._subirArchivo.subirArchivo(archivo,'usuarios',id)
            .then( (resp:any)=>{
                resp = JSON.parse(resp);

                this.usuario.img =resp.usuarios.img; 

                Swal.fire({
                    title: 'Imagen actualizada!',
                    text: this.usuario.img,
                    icon: 'success'
                });

                this.guardarStorage(this.usuario._id, this.token, this.usuario);

                // console.log('OK!',resp.usuarios.img);
                
            })
            .catch( err=>{
                console.log('ERROR!',err);
            });

    }

    public cargarUsuarios(desde: number = 0){
        const url = URL_SERVICIOS + '/usuario?desde=' + desde;

        return this.http.get(url)
            .pipe(map( (resp:any)=>{
                return resp;
            }));
    }

    public buscarUsuario(textoBusqueda: string){
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + textoBusqueda;

        if(textoBusqueda===''){
            return this.cargarUsuarios();
        }

        return this.http.get(url)
            .pipe(map( (resp:any)=>{
                return resp;
            }));
    }

    public borrarUsuario(usuario: Usuario){
        const url = URL_SERVICIOS + '/usuario/' + usuario._id;

        return this.http.delete(url,{headers: {token:this.token}})
            .pipe(map( (resp:any)=>{
                Swal.fire({
                    title: 'Usuario eliminado con exito!',
                    text: usuario.email,
                    icon: 'success'
                });

                return resp;
            }));

    }

    public guardarUsuario(usuario: Usuario){
        const url = URL_SERVICIOS + '/usuario/' + usuario._id;

        return this.http.put(url,usuario,{headers: {token:this.token}})
            .pipe(map( (resp:any)=>{

                if(usuario._id===this.usuario._id){
                    // si el usuario modificado es el logueado, actualizo info de sesion del mismo
                    let usuarioBD: Usuario = resp.usuario;
                    this.guardarStorage(usuarioBD._id,this.token, usuarioBD);

                }

                
                Swal.fire({
                    title: 'Usuario actualizado con exito!',
                    text: usuario.email,
                    icon: 'success'
                });

                return resp;
            }));

    }
}
