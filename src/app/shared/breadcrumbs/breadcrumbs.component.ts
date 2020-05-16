import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {
    
    public evento: any = {};
    public titulo: string = 'blank';

    constructor( private router: Router,
                 private title: Title,
                 private meta: Meta  ) {

        this.getDataRoute()
            .subscribe( (data: any) =>{
                
                this.titulo = data.titulo;
                this.title.setTitle(this.titulo);

                const metaTag: MetaDefinition = {
                    name : 'description',
                    content: this.titulo
                };

                this.meta.updateTag(metaTag);
            });
    }

    ngOnInit(): void {
    }

    public getDataRoute(){
        return this.router.events
            .pipe(
                filter( event =>  event instanceof ActivationEnd),
                filter( (event: ActivationEnd) =>  !event.snapshot.firstChild),
                map( (event: ActivationEnd) =>  event.snapshot.data)
            );
    }

}
