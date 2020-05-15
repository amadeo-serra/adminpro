import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

    constructor(public _ajustes: SettingsService) { 
        
    }

    ngOnInit(): void {
        this.colocarCheck();    
    }

    public cambiarColor(tema: string, link: any) {
        this._ajustes.aplicarTema(tema);

        // const url = `assets/css/colors/${tema}.css`;

        // this._document.getElementById('tema').setAttribute('href',url);

        // this._ajustes.ajustes.tema=tema;
        // this._ajustes.ajustes.temaUrl=url;

        this.aplicarCheck(link);

        // this._ajustes.guardarAjustes();
    }

    public aplicarCheck(link: any){
        
        const selectores: any = document.getElementsByClassName('selector');
            
        for( let ref of selectores ){
            ref.classList.remove('working');

        }
        
        link.classList.add('working');
    }

    public colocarCheck(){
        
        const selectores: any = document.getElementsByClassName('selector');
            
        for( let ref of selectores ){

            // console.log('comparo ' + ref.getAttribute('data-theme') + ' con ' + this._ajustes.ajustes.tema);

            if(ref.getAttribute('data-theme')===this._ajustes.ajustes.tema){
                ref.classList.add('working');
                break;
            }

        }
    }
}
