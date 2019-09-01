import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BienService, BienDTO } from '../bien.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { EntityRefDTO } from 'src/app/util/utils';
import { PersonaService } from 'src/app/persona/persona.service';
import { AreaService } from 'src/app/area/area.service';

@Component({
  selector: 'bien-editor',
  templateUrl: './bien-editor.component.html',
  styleUrls: ['./bien-editor.component.css']
})
export class BienEditorComponent implements OnInit, OnDestroy {

  bien: BienDTO = new BienDTO();

  sub: Subscription;
  tiposBien: Array<EntityRefDTO>;
  estadosBien: Array<EntityRefDTO>;
  listaPersonas:  Array<EntityRefDTO>;
  listaAreas: Array<EntityRefDTO>;
  tipoAsignacion = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bienService: BienService, 
              private personaService:PersonaService, 
              private areaService:AreaService) {
  }

  ngOnInit() {
    
    this.bienService.getTiposBien().subscribe( t => this.tiposBien = t, this.handleError);
    this.bienService.getEstadosBien().subscribe( t => this.estadosBien = t, this.handleError);

    this.personaService.getAll().subscribe( p => this.listaPersonas = p, this.handleError);
    this.areaService.getAll().subscribe( a => this.listaAreas = a, this.handleError);

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.bienService.getById(id).subscribe((bien: BienDTO) => {
          if (bien) {
            this.bien = bien;
            this.tipoAsignacion = bien.idPersonaAsignada > 0? 0 : 1;
          } else {
            console.log(`No se encontró el bien con id '${id}' `);
            this.gotoList();
          }
        });
      }
    });
  }


  handleError(e):void{
    console.log(e);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/listar-bienes']);
  }

  save(data: any) {
    var bien = data as BienDTO;
    this.bienService.save(bien).subscribe(result => {
      this.gotoList();
    }, this.handleError);
  }

  remove(id) {
    this.bienService.remove(id).subscribe(result => {
      this.gotoList();
    }, this.handleError);
  }
}