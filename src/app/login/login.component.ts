import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

    public recuerdame=false;
    public email='';
    public auth2: any;

    constructor(
            public router: Router, 
            public _usuarioService: UsuarioService
            ) {

    }

    ngOnInit(): void {
        init_plugins();

        this.googleInit();

        this.email = localStorage.getItem('email') || '';

        if(this.email.length>1){
            this.recuerdame=true;
        }
    }

    public googleInit(){

        gapi.load('auth2', ()=>{
            
            this.auth2 = gapi.auth2.init({
                clien_id: '277417423196-i6tlu4bff91r15t15di6vpspmn99ob35.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            this.attachSignin( document.getElementById('bntGoogle') );

        });

    }

    public attachSignin( element ){
    // public attachSignin(  ){
        
        // console.log('CLICK!!!!');

        // const element = document.getElementById('bntGoogle');

        this.auth2.attachClickHandler( element, {}, googleUSer => {
            
            // let profile = googleUSer.getBasicProfile();

            let token = googleUSer.getAuthResponse().id_token;

            this._usuarioService.loginGoogle(token)
                // no se porque esto no funciona del todo bien, es como si no regresara a 
                // dashboard correctamente (en el video de curso tbien ocurre)
                //.subscribe( loginCorrecto => this.router.navigate(['/dashboard']));
                // lo resuelve asi...
                .subscribe( loginCorrecto => window.location.href='#/dashboard' );


        });
    }

    public ingresar( forma: NgForm ) {
        
        if( forma.invalid ){
            return;
        }

        //console.log( forma.value );
        
        const usuario = new Usuario(null,forma.value.email,forma.value.password);

        this._usuarioService.login(usuario,forma.value.recuerdame)
            .subscribe( loginCorrecto => this.router.navigate(['/dashboard']));

        // this.router.navigate(['/dashboard']);
    }
}
