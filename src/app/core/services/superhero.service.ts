import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SuperheroService {
    constructor(private http: HttpClient) {
    }

    getCovidData(): Observable<any> {
        const url_api = "https://coronavirus-tracker-api.herokuapp.com/all";
        return this.http.get(url_api);
    }

}
