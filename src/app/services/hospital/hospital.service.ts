import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import {map} from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    constructor(
            public http:HttpClient, 
            public _usuarioService: UsuarioService
            ) { }

    public borrarHospital(hospital: Hospital){
        
        const url = URL_SERVICIOS + '/hospital/' + hospital._id;
        
        // console.log(url);

        return this.http.delete(url,{headers:{token: this._usuarioService.token}})
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                Swal.fire({
                    title: 'Hospital eliminado con exito!',
                    text: hospital.nombre,
                    icon: 'success'
                });

                return resp;
            }));
        
    }

    public crearHospital(nombre: string){
        
        const url = URL_SERVICIOS + '/hospital';
        
        // console.log(url);

        return this.http.post(url,{nombre:nombre},{headers:{token: this._usuarioService.token}})
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                Swal.fire({
                    title: 'Hospital creado con exito!',
                    text: resp.nombre,
                    icon: 'success'
                });

                return resp;
            }));
        
    }

    public actualizarHospital(hospital: Hospital){
        
        const url = URL_SERVICIOS + '/hospital/' + hospital._id;
        
        // console.log(url);

        return this.http.put(url,hospital,{headers:{token: this._usuarioService.token}})
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                Swal.fire({
                    title: 'Hospital actualizado con exito!',
                    text: resp.nombre,
                    icon: 'success'
                });

                return resp;
            }));
        
    }

    public obtenerHospital(id: string){
        
        const url = URL_SERVICIOS + '/hospital/' + id;
        
        // console.log(url);

        return this.http.get(url)
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                return resp.hospital;
            }));
        
    }


    public cargarHospitales(desde: number){
        
        const url = URL_SERVICIOS + '/hospital?desde=' + desde;
        
        // console.log(url);

        return this.http.get(url)
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                return resp;
            }));
        
    }

    public buscarHospital(textoBusqueda: string){
        
        const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + textoBusqueda;
        
        // console.log(url);

        return this.http.get(url)
            .pipe( map( (resp:any)=>{
                // console.log(resp);

                return resp;
            }));
        
    }
}
