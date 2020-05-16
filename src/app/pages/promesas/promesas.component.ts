import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {
    
    constructor() {
        

        // OPCION 1, solo uso THEN
        // this.contarTres().then(
        //     ()=> console.log('Termino!'),
        //     ()=> console.log('Error!')
        // );

        // OPCION 2, uso THEN y CATCH
        this.contarTres().then(
            mensaje=> console.log(mensaje),
        )
        .catch(
            error=> console.error('Error!',error)
        );
    }

    ngOnInit(): void {
    }

    contarTres(): Promise<string>{

        return new Promise( (resolve , reject) =>{
            let contador = 0;
            let intervalo = setInterval(() => {
                contador += 1;

                console.log(contador);

                if (contador===3){
                    resolve('han pasado 3 segundos');
                    //reject('probando errores');

                    clearInterval(intervalo);
                }
            }, 1000);
        });
    }

}
