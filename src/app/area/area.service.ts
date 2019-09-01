import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService, EntityRefDTO } from '../util/utils';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends AbstractService {

  getAll() : Observable<EntityRefDTO[]> {
    return this.httpGet<EntityRefDTO[]>("area");
  }
}


