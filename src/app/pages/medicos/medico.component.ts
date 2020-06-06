import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

    public hospitales: Hospital[] = [];
    public hospital: Hospital = new Hospital('');
    public medico: Medico = new Medico('','','','','');
    public medicoIdRecibido: string = '';
    public cargando: boolean = true;
    
    constructor(
        public _medicoService: MedicoService,
        public _hospitalService: HospitalService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public _modalUploadService: ModalUploadService
        ) {

        // const idMedico = this.route.id;

        this._modalUploadService.notificacion
            .subscribe(resp=>{
                console.log(JSON.parse(resp));

                this.medico.img = JSON.parse(resp).medicos.img;
            });

    }

    ngOnInit(): void {

        this.medicoIdRecibido = this.activatedRoute.snapshot.params['id'];
        // console.log(`Id medico recibido ${this.medicoIdRecibido}`);

        // this.activatedRoute.params.subscribe(params => {
        //     this.medicoIdRecibido = params['id'];

        
        //     console.log(`Id medico recibido ${this.medicoIdRecibido}`);

            
        // });

        
        if(this.medicoIdRecibido!=='nuevo'){
            // estoy ACTUALIZANDO un medico que ya existe
            this.cargarMedico();
        }else{
            this.cargando = false;
        }

        this.cargarHospitales();
    }

    public cargarMedico(){
        this._medicoService.obtenerMedico(this.medicoIdRecibido)
            .subscribe ( (medico:any)=>{
                // this.medico.nombre = medico.nombre;
                // this.medico.hospital = medico.hospital._id ;
                this.hospital = medico.hospital ;
                this.medico = medico;
                this.medico.hospital = medico.hospital._id ;

                this.cargando = false;
            });
    }

    public cargarHospital( event ){

        this._hospitalService.obtenerHospital(this.medico.hospital)
            .subscribe ( (hospital:any)=>{
                this.hospital = hospital;
            });

    }

    public guardarMedico(f: NgForm){
        
        if(f.invalid){
            return;
        }

        console.log('***** GUARDANDO *****');
        console.log(f.valid);
        console.log(f.value);
        console.log(this.medico);
        console.log('***** /GUARDANDO *****');

        if(this.medicoIdRecibido==='nuevo'){
            this._medicoService.crearMedico(this.medico)
            .subscribe( (resp:any ) =>{
                
                this.medicoIdRecibido = resp.medico._id;
                this.medico._id = resp.medico._id;
                
                this.router.navigate(['/medico',resp.medico._id]);

                console.log(resp);
                
            });
        }else{
            this._medicoService.actualizarMedico(this.medico)
            .subscribe( (resp:any ) =>{
                
                console.log(resp);
                
            });
        }

        
    }

    public cargarHospitales(){

        this._hospitalService.cargarHospitales(0)
            .subscribe( (resp : any)=>{
                this.hospitales = resp.hospitales;
            });

    }

    public mostrarModal(){
        this._modalUploadService.mostrarModal('medicos',this.medico._id);
    }

}
