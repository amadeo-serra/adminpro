import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
        ){
        
    }

    public actualizarMedico(medico: Medico){
        
        const url = URL_SERVICIOS + '/medico/' + medico._id;
        // const url = URL_SERVICIOS + '/medico';
        
        console.log('recibo este medico para ACTUALIZAR',medico);

        return this.http.put(url,medico,{headers:{token: this._usuarioService.token}})
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                Swal.fire({
                    title: 'Medico actualizado con exito!',
                    text: medico.nombre,
                    icon: 'success'
                });

                return resp;
            }));
        
    }

    public crearMedico(medico: Medico){
        // const url = URL_SERVICIOS + '/medico/' + medico._id;
        const url = URL_SERVICIOS + '/medico';
        
        console.log('recibo este medico para CREAR',medico);

        return this.http.post(url,medico,{headers:{token: this._usuarioService.token}})
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                Swal.fire({
                    title: 'Medico creado con exito!',
                    text: medico.nombre,
                    icon: 'success'
                });

                return resp;
            }));
    }

    public obtenerMedico(id: string){
        
        const url = URL_SERVICIOS + '/medico/' + id;
        
        // console.log(url);

        return this.http.get(url)
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                return resp.medico;
            }));
        
    }

   public borrarMedico(medico: Medico){
        
        const url = URL_SERVICIOS + '/medico/' + medico._id;
        
        // console.log(url);

        return this.http.delete(url,{headers:{token: this._usuarioService.token}})
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                Swal.fire({
                    title: 'Medico eliminado con exito!',
                    text: medico.nombre,
                    icon: 'success'
                });

                return resp;
            }));
        
    }

    public cargarMedicos(desde: number = 0){
        
        const url = URL_SERVICIOS + '/medico?desde=' + desde;

        return this.http.get(url)
            .pipe( map( (resp : any) =>{

                    return resp;

                }
            ));


    }

    public buscarMedico(textoBusqueda: string){
        const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + textoBusqueda;
        
        // console.log(url);

        return this.http.get(url)
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                return resp;

            }));
    }


}
