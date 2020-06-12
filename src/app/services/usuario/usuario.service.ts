import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string = '';
    menu: any[] = [];

    constructor(public http: HttpClient, 
                public router: Router,
                public _subirArchivo: SubirArchivoService) {
        //console.log('svc ok!');

        this.cargarStorage();
        
    }

    public renuevaToken(){
        const url = URL_SERVICIOS + '/login/renuevatoken';

        return this.http.post(url, {}, { headers: { token: this.token } })
            .pipe(map( (resp: any) => {
                
                this.token = resp.token;
                localStorage.setItem( 'token', this.token );
                
                return true;
            }),
            catchError( (err,)=>{
                Swal.fire({
                    title: 'Error al renovar token',
                    text: err.error.mensaje,
                    icon: 'error'
                });
                    
                this.router.navigate(['/login']);
                    

                return throwError(err);
            })
        );
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

    private guardarStorage(id: string, token: string, usuario:Usuario, menu: any){
        localStorage.setItem( 'id', id );
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'usuario', JSON.stringify(usuario) );
        localStorage.setItem( 'menu', JSON.stringify(menu) );

        this.usuario=usuario;
        this.token=token;
        this.menu = menu;
    }


    private cargarStorage(){
        if(localStorage.getItem('token')){
            this.token = localStorage.getItem('token') || '';
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        }else{
            this.token='';
            this.usuario=null;
            this.menu=null;

        }
    }


    public logout(){
        this.usuario=null;
        this.token = '';
        this.menu = null;

        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);
    }

    public loginGoogle( tokenGoogle: string ){
        const url = URL_SERVICIOS + '/login/google';

        return this.http.post(url, {token: tokenGoogle})
            .pipe(map( (resp: any) => {
                
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                
                // console.log(resp);

                return true;

            }))
            ;
    }

    public login( usuario: Usuario, recuerdame: boolean = false){
        
        if(recuerdame){
            localStorage.setItem('email',usuario.email);
        }else{
            localStorage.removeItem('email');
        }

        let url = URL_SERVICIOS + '/login';

        return this.http.post(url,usuario)
            .pipe(
                map( (resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                return true;
                })
                ,
                catchError( (err,)=>{
                    Swal.fire({
                        title: 'Error',
                        text: err.error.mensaje,
                        icon: 'error'
                      });
    
                    return throwError(err);
                })
            );

    }

    public crearUsuario( usuario: Usuario){
        
        let url = URL_SERVICIOS + '/usuario';

        return this.http.post(url,usuario)
            .pipe(
                map( (resp:any)=>{
                
    
                Swal.fire({
                    title: 'Usuario creado con exito',
                    text: usuario.email,
                    icon: 'success'
                  });
    
                return resp.usuario;
                })
                ,
                catchError( (err,)=>{
                    Swal.fire({
                        title: err.error.mensaje,
                        text: err.error.errors.message,
                        icon: 'error'
                      });
    
                    return throwError(err);
                })
        );

            // .subscribe( (resp)=>{
            //     console.log('resp',resp);
            // });
    }

    public actualizarUsuario(usuario:Usuario){
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;

        return this.http.put(url, usuario, { headers: { token: this.token } })
            .pipe(
                map((resp: any) => {
    
    
                    Swal.fire({
                        title: 'Usuario actualizado con exito',
                        text: usuario.email,
                        icon: 'success'
                    });
    
                    this.guardarStorage(resp.usuario.id, this.token, resp.usuario, this.menu);
    
                    return resp.usuario;
                })
                ,
                catchError((err, ) => {
                    Swal.fire({
                        title: err.error.mensaje,
                        text: err.error.errors.message,
                        icon: 'error'
                    });

                    return throwError(err);
                })
            );

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

                this.guardarStorage(this.usuario._id, this.token, this.usuario, this.menu);

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
                    this.guardarStorage(usuarioBD._id,this.token, usuarioBD, this.menu);

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
