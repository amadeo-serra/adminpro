import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    
    public ajustes: Ajustes = {
        temaUrl: 'assets/css/colors/default.css',
        tema: 'default'
    };
    

    constructor( @Inject(DOCUMENT) private _document,
    ) { }

    public guardarAjustes(){
        localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
    }

    public cargarAjustes(){
        if(localStorage.getItem('ajustes')){
            this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }

        this.aplicarTema(this.ajustes.tema);
    }

    public aplicarTema(tema:string){

        const url = `assets/css/colors/${tema}.css`;

        this._document.getElementById('tema').setAttribute('href',url);

        this.ajustes.tema=tema;
        this.ajustes.temaUrl=url;


        this.guardarAjustes();

    }
    
}

interface Ajustes{
    temaUrl: string;
    tema:string;

}
