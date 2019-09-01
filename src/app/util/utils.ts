import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class EntityRefDTO {
    public id:number;
    public label:string;
}


export class AbstractService {

    constructor(protected http: HttpClient){
    }

    protected completeURL(path:string):string{
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        var host = environment.backendServer;
        return host + path;
    }
    protected httpGet<T>(url: string, params?): Observable<T> {
        var fullUrl = this.completeURL(url);
        return this.http.get(fullUrl).pipe(map((response:any) => response));
    }
     

}