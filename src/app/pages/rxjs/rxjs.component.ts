import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry,map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

    public subscription: Subscription;

    constructor() {
        // EJEMPLO 1
        // this.regresaObservable1()
        //     .pipe(
        //         retry(2)
        //     )
    
        //     .subscribe(
        //         contador => console.log('OBS-1: subs',contador),
        //         error=>console.error('OBS-1: error',error),
        //         ()=> console.log('OBS-1: el observador termino')
        //     );


        // EJEMPLO 2
        this.subscription = this.regresaObservable2()
            .pipe(
                retry(2)
            )
    
            .subscribe(
                contador => console.log('OBS-2: subs',contador),
                error=>console.error('OBS-2: error',error),
                ()=> console.log('OBS-2: el observador termino')
            );
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        
        this.subscription.unsubscribe();
    }

    public regresaObservable1(): Observable<number>{
        return new Observable( (observer: Subscriber<number>) =>{
            
            let contador = 0;

            const intervalo = setInterval( () => {
                
                contador++;

                observer.next( contador );
                    
                if( contador===3 ){
                    clearInterval(intervalo);

                    observer.complete();
                }
                
                if( contador===2 ){
                    clearInterval(intervalo);

                    observer.error('2!!');
                }
                    
            },1000);

        });
    }

    public regresaObservable2(): Observable<any>{
        return new Observable( (observer: Subscriber<any>) =>{
            
            let contador = 0;

            const intervalo = setInterval( () => {
                
                contador++;

                const salida = {
                    valor:contador
                };

                observer.next( salida );
                    
                if( contador===3 ){
                    //clearInterval(intervalo);

                    // observer.complete();
                }
                
                // if( contador===2 ){
                //     clearInterval(intervalo);

                //     observer.error('2!!');
                // }
                    
            },1000);

        })
            .pipe(
                map( response =>response.valor),
                filter( (valor, index) => {
                    // console.log('OBS-2.Filter',valor,index);

                    if ( ( valor % 2)=== 1 ){
                        // impar
                        return true;
                    }else{
                        //par
                        return false;
                    }
                })
            );
    }

}
