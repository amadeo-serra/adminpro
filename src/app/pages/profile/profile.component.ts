import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;

    imagenSubir: File;
    imagenTemp: any;

    constructor( public _usuarioService: UsuarioService) {

        this.usuario=this._usuarioService.usuario;

    }

    ngOnInit(): void {


    }

    public guardar( usuario: Usuario){
        try {
            
            this.usuario.nombre = usuario.nombre;

            if(!this.usuario.google){
                //por si acaso
                this.usuario.email = usuario.email;    
            }

            
    
            this._usuarioService.actualizarUsuario(this.usuario)
                .subscribe( resp=>{
    
                    console.log('resp',resp);
    
                });

        } catch (error) {
            console.log('error',error);
        }

    }

    public seleccionImagen(evento){
        const archivo = evento.target.files[0];

        if(!archivo){
            this.imagenSubir = null;
            return;
        }

        
        if(archivo.type.indexOf('image')<0){
            Swal.fire({
                title: 'Error',
                text: 'El archivo seleccionado no es una imagen',
                icon: 'error'
            });
            
            this.imagenSubir=null;
            
            return;
        }
        
        console.log('IMAGEN = ', archivo);

        this.imagenSubir=archivo;
        
        // vanilla JS
        let reader = new FileReader();
        let urlImagenTemp = reader.readAsDataURL(archivo);

        reader.onloadend= ()=>{
            this.imagenTemp = reader.result;
            // console.log(reader.result);
        };
    }

    public cambiarImagen(){
        this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
    }

}
