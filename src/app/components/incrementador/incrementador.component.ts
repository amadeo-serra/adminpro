import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

    @ViewChild('txtProgress') txtProgress: ElementRef;

    @Input('nombre') leyenda: string ='Leyenda';
    @Input() progreso: number = 50;

    @Output() cambiaProgreso: EventEmitter<number> = new EventEmitter();
    

    constructor() {
        console.log('leyenda',this.leyenda);
    }

    ngOnInit(): void {
        console.log('leyenda',this.leyenda);
    }


    public cambiarValor(valor: number){

        if(this.progreso>=100 && valor>0){
            this.progreso = 100;
            return;
        }

        if(this.progreso<=0 && valor<0){
            this.progreso = 0;
            return;
        }

        let aux:number = this.progreso;

        aux= aux*1 + valor*1;

        this.progreso = aux;

        this.cambiaProgreso.emit( this.progreso );

        this.txtProgress.nativeElement.focus();
    }

    public onChange(newValue: number){

        if(newValue>=100){
            newValue=100;
        }else if(newValue<=0){
            newValue=0;
        }

        this.progreso = newValue;

        this.txtProgress.nativeElement.value=this.progreso;

        this.cambiaProgreso.emit( newValue );

    }
}
