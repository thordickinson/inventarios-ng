import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BienService, BienDTO } from '../bien.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { EntityRefDTO } from 'src/app/util/utils';
import { PersonaService } from 'src/app/persona/persona.service';
import { AreaService } from 'src/app/area/area.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'bien-editor',
  templateUrl: './bien-editor.component.html',
  styleUrls: ['./bien-editor.component.css']
})
export class BienEditorComponent implements OnInit, OnDestroy {

  public bien: BienDTO = new BienDTO();

  public sub: Subscription;
  public tiposBien: Array<EntityRefDTO>;
  public estadosBien: Array<EntityRefDTO>;
  public listaPersonas:  Array<EntityRefDTO>;
  public listaAreas: Array<EntityRefDTO>;
  public tipoAsignacion = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bienService: BienService, 
              private personaService:PersonaService, 
              private areaService:AreaService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    
    this.bienService.getTiposBien().subscribe( t => this.tiposBien = t, e => this.handleError(e));
    this.bienService.getEstadosBien().subscribe( t => this.estadosBien = t, e => this.handleError(e));

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
    var message = "Ocurrió un error";
    if(e.error && e.error.message){
      var fullmsg = e.error.message as string;
      if(fullmsg.indexOf("fechaCompra") > 0){
        message = "La fecha de compra debe ser menor a la fecha actual";
      }
    }
    this.snackBar.open(message, null, {
      duration: 20000, panelClass: "error-snack-bar"
    });
    console.log(e);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public gotoList() {
    this.router.navigate(['/listar-bienes']);
  }

  public save(data: any) {
    var bien = data as BienDTO;
    this.bienService.save(bien).subscribe(result => {
      this.gotoList();
    }, e => this.handleError(e));
  }

  public remove(id) {
    this.bienService.remove(id).subscribe(result => {
      this.gotoList();
    }, e => this.handleError(e));
  }
}