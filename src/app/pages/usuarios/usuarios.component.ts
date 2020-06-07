import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

    usuarios: Usuario[] = [];
    desde: number = 0;
    totalRegistros: number = 0;
    cargando: boolean = true;
    textoBusqueda: string = '';

    constructor( public _usuariosService: UsuarioService,
                 public _modalUploadService: ModalUploadService,
                 public activatedRoute: ActivatedRoute
                 ) {

    }

    ngOnInit(): void {

        this.textoBusqueda = this.activatedRoute.snapshot.params.textoBusqueda;

        if(!this.textoBusqueda){
            this.textoBusqueda='';
        }

        this.cargarUsuarios();


        this._modalUploadService.notificacion
            .subscribe(resp=>{
                this.cargarUsuarios();
            });
    }
    
    public mostrarModal(id : string){

        this._modalUploadService.mostrarModal('usuarios', id);

    }

    public cargarUsuarios(){
        if(this.textoBusqueda===''){
            // console.log('TODOS');
            this.cargarTodosLosUsuarios();
        }else{
            // console.log('BUSCO:' + this.textoBusqueda);
            this.buscarUsuario(this.textoBusqueda);
        }
    }

    public cargarTodosLosUsuarios(){

        this.cargando = true;

        this._usuariosService.cargarUsuarios(this.desde)
            .subscribe( (resp:any)=>{

                this.totalRegistros = resp.cuenta;
                this.usuarios = resp.usuarios;

                this.cargando = false;
            });
    }

    public cambiarDesde(incr: number){
        let desde = this.desde + incr;

        

        if(desde < 0){
            return;
        }

        if(desde >= this.totalRegistros){
            return;
        }

        this.desde += incr;

        console.log('nuevo desde', this.desde);

        this.cargarUsuarios();

    }

    public buscarUsuario(textoBusqueda: string){

        this.cargando = true;

        if(textoBusqueda===''){
            textoBusqueda = this.textoBusqueda;
        }

        this._usuariosService.buscarUsuario(textoBusqueda)
            .subscribe( (resp:any)=>{
    
                this.totalRegistros = resp.cuenta;
                this.usuarios = resp.usuarios;
    
                this.cargando = false;
            });

    }

    public borrarUsuario(usuario: Usuario){

        if (usuario._id === this._usuariosService.usuario._id){
            Swal.fire({
                title: 'Aviso al eliminar',
                text: 'no puede eliminarse a si mismo',
                icon: 'warning'
            });

            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se eliminará el usuario ' + usuario.email,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {

                this._usuariosService.borrarUsuario(usuario)
                .subscribe( (resp:any)=>{
                    
                    this.cargarUsuarios();
    
                });

            }
          });
        


    }

    public guardarUsuario(usuario: Usuario){

        this._usuariosService.guardarUsuario(usuario)
        .subscribe( (resp:any)=>{
            
            this.cargarUsuarios();

        });


        // if (usuario._id === this._usuariosService.usuario._id){
        //     Swal.fire({
        //         title: 'Aviso al eliminar',
        //         text: 'no puede eliminarse a si mismo',
        //         icon: 'warning'
        //     });

        //     return
        // }

    //     Swal.fire({
    //         title: '¿Estás seguro?',
    //         text: 'Se eliminará el usuario ' + usuario.email,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.value) {

    //             this._usuariosService.borrarUsuario(usuario)
    //             .subscribe( (resp:any)=>{
                    
    //                 this.cargarUsuarios();
    
    //             });

    //         }
    //       });
        


    }
}
