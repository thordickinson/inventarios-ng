import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService, EntityRefDTO } from '../util/utils';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BienService extends AbstractService {
  

  getAll(): Observable<Array<BienDTO>> {
    return this.httpGet<Array<BienDTO>>("bien");
  }


  getById(id: string): Observable<BienDTO> {
    return this.httpGet<BienDTO>("bien" + '/' + id);
  }

  save(bien: BienDTO): Observable<any> {
    let result: Observable<Object>;
    if (bien.id > 0) {
      result = this.http.put(this.completeURL("bien"), bien); //Create
    } else {
      result = this.http.post(this.completeURL("bien"), bien); //Update
    }
    return result;
  }

  getTiposBien() : Observable<Array<EntityRefDTO>> {
    return this.httpGet<Array<EntityRefDTO>>("bien/tipo");
  }

  getEstadosBien() : Observable<Array<EntityRefDTO>> {
    return this.httpGet<Array<EntityRefDTO>>("bien/tipoEstado");
  }

  remove(id: string) {
    return this.http.delete(this.completeURL("bien/" + id));
  }

}

export class BienDTO {
  public id: number;
  public serial: string;
  public nombre: string;
  public descripcion: string;
  public idTipo: number;
  public valorCompra: number;
  public fechaCompra: Date;
  public idEstado: number;
  public idAreaAsignada: number;
  public idPersonaAsignada: number;
}
