import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    private jsonURL = 'assets/sample.json';


    post(path: string, body: Object = {}): Observable<any> {
        let res = this.httpClient.post(path, body, { headers: this.setHttpHeaders() });
        return res;
    }

    private setHttpHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        return headers;
    }

    get(path: string): Observable<any> {
        let res = this.httpClient.get(path);
        //let res = this.httpClient.get(this.jsonURL); Uncomment this to test it locally.
        return res;
    }


}