import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

    public hospitales: Hospital[] = [];
    public cargando: boolean = true;
    public totalRegistros: number = 0;
    public desde: number = 0;

    constructor(
        public _hospitalesService: HospitalService,
        public _modalUploadService: ModalUploadService
    ) {
        _modalUploadService.notificacion
            .subscribe( ()=>{
                this.cargarHospitales();
            })
    }

    ngOnInit(): void {
        this.cargarHospitales();
    }

    public crearHospital() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            // progressSteps: ['1']
        }).queue([
            {
                title: 'Nuevo hospital',
                text: 'Introdocue nombre'
            },
        ]).then((result) => {
            if (result.value) {
                console.log('answer', result.value[0]);

                const nombre = result.value[0];

                if (nombre===''){
                    return;
                }
                
                this._hospitalesService.crearHospital(nombre)
                    .subscribe( resp=>{
                        this.cargarHospitales();
                    });
            }
        })
    }
    
    public cargarHospitales(){
        this.cargando = true;

        this._hospitalesService.cargarHospitales(this.desde)
            .subscribe( resp=>{
                this.hospitales = resp.hospitales;
                this.totalRegistros = resp.cuenta;

                this.cargando = false;
            });
    }

    public actualizarHospital(hospital: Hospital){
        console.log('hospital',hospital);

        this._hospitalesService.actualizarHospital(hospital)
            .subscribe( resp => {

            });
    }

    public borrarHospital(hospital: Hospital){
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se eliminará el hosptial ' + hospital.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {

                this._hospitalesService.borrarHospital( hospital )
                .subscribe( resp=>{
                    this.cargarHospitales();
                });

            }
          });


    }

    public buscarHospital(textoBusqueda: string){
        
        if(textoBusqueda===''){
            this.cargarHospitales();
            return;
        }


        this.cargando = true;

        this._hospitalesService.buscarHospital(textoBusqueda)
            .subscribe( resp=>{
                this.hospitales = resp.hospitales;
                this.totalRegistros = this.hospitales.length;

                this.cargando = false;
            });
    }

    public cambiarDesde(incr: number){
        
        let desde = this.desde;

        desde += incr;

        if( desde>=this.totalRegistros ){
            return;
        }

        if( desde<0){
            return;
        }

        this.desde = desde;

        this.cargarHospitales();
        
    }

    public mostrarModal(id: string){
        this._modalUploadService.mostrarModal('hospitales',id);
    }

}
