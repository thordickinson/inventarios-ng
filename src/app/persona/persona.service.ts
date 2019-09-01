import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService, EntityRefDTO } from '../util/utils';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends AbstractService {

  getAll() : Observable<Array<EntityRefDTO>> {
    return this.httpGet("persona");
  }
}
