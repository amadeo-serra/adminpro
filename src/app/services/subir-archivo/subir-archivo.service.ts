import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

    constructor() { }

    public subirArchivo( archivo: File , tipo:string, id: string ){
        
        return new Promise( (resolve,reject)=> {

            // Esto se hace en jscript puro (vanilla js)
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
    
            formData.append( 'imagen', archivo, archivo.name);
    
            xhr.onreadystatechange = function () {
                
                if (xhr.readyState === 4){
    
                    if (xhr.status === 200){
                        
                        console.log('imagen subida!!');

                        resolve(xhr.response);

                        return;
                    }else{
                        console.log('fallo al subir imagen');
                        reject('fallo al subir imagen');
                    }

                }
    
    
            };

            const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
            
            xhr.open('PUT',url,true);

            xhr.send(formData);
        });


    }
}
