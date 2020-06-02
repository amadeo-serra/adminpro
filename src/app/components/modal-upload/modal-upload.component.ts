import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

    usuario: Usuario;

    imagenSubir: File;
    imagenTemp: any;

    constructor( 
        public _subirArchivoService: SubirArchivoService,
        public _modalUploadService: ModalUploadService
    ){
    }

    ngOnInit(): void {
    }

    public subirImagen(){
        this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
            .then( (resp:any)=>{

                this._modalUploadService.notificacion.emit( resp );
                this.cerrarModal();
            })
            .catch( err=>{
                console.log('ERROR!',err);
            });
    }

    public cerrarModal(){
        this.imagenTemp=null;
        this.imagenSubir=null;
        
        this._modalUploadService.ocultarModal();
    }


    public seleccionImagen(evento) {
        const archivo = evento.target.files[0];

        if (!archivo) {
            this.imagenSubir = null;
            return;
        }


        if (archivo.type.indexOf('image') < 0) {
            Swal.fire({
                title: 'Error',
                text: 'El archivo seleccionado no es una imagen',
                icon: 'error'
            });

            this.imagenSubir = null;

            return;
        }

        // console.log('IMAGEN = ', archivo);

        this.imagenSubir = archivo;

        // vanilla JS
        const reader = new FileReader();
        const urlImagenTemp = reader.readAsDataURL(archivo);

        reader.onloadend = () => {
            this.imagenTemp = reader.result;
            // console.log(reader.result);
        };
    }

}
