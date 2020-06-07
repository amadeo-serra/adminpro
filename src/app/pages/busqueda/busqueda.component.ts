import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
    
    public textoBusqueda: string;
    public usuarios: Usuario[] = [];
    public medicos: Medico[] = [];
    public hospitales: Hospital[] = [];

    constructor(
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        public router: Router

    ) {
        this.activatedRoute.params
            .subscribe( params=>{
                this.textoBusqueda = params.textoBusqueda;

                this.buscar(this.textoBusqueda);
            });
    }

    ngOnInit(): void {
    }

    public buscar(textoBusqueda: string){

        const url = URL_SERVICIOS + '/busqueda/todo/' + textoBusqueda;

        this.http.get(url)
            .subscribe( (resp: any)=>{
                console.log(resp.usuarios);
                this.usuarios = resp.usuarios;
                this.medicos = resp.medicos;
                this.hospitales = resp.hospitales;

            });
    }

    public editarUsuario(usuario: Usuario){
        this.router.navigate(['/usuarios',usuario.email]);
    }

    public editarHospital(hospital: Hospital){
        this.router.navigate(['/hospitales']);
    }

    public editarMedico(medico: Medico){
        this.router.navigate(['/medico',medico._id]);
    }

}
