import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

    public medicos: Medico[] = [];
    public cargando: boolean = false;
    public totalRegistros:number = 0;
    public desde:number = 0;

    constructor(
            public _medicoService: MedicoService,
            public _modalUploadService: ModalUploadService,
        ) { }

    ngOnInit(): void {

        this.cargarMedicos();

    }

    public cargarMedicos(){

        this.cargando = true;

        this._medicoService.cargarMedicos(this.desde)
            .subscribe( (resp: any) => {
                
                this.totalRegistros = resp.cuenta;
                this.medicos = resp.medicos;
                console.log(resp);

                this.cargando = false;
            });

    }

    public borrarMedico(medico: Medico){

            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Se eliminará el medico ' + medico.nombre,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
    
                    this._medicoService.borrarMedico( medico )
                    .subscribe( resp=>{
                        this.cargarMedicos();
                    });
    
                }
              });
    
    
    }

    public buscarMedico(textoBusqueda: string){

            if(textoBusqueda===''){
                this.cargarMedicos();
                return;
            }
    
    
            this.cargando = true;
    
            this._medicoService.buscarMedico(textoBusqueda)
                .subscribe( resp=>{
                    this.medicos = resp.medicos;
                    this.totalRegistros = this.medicos.length;
    
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

        this.cargarMedicos();
        
    }



}
