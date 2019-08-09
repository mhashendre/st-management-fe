import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { environment } from 'src/environments/environment';

@Injectable()
export class RestService {

    private url: string;
    private port: string;
    private route: string;
    private contextpath: string;


    constructor(private apiservice: ApiService) {
        this.url = environment.host;
        this.port = environment.port;
        this.contextpath = environment.context_path;
    }

    sendObjectData(object: any, routeSelector: string): any {
        const url = this.url + ':' + this.port + '' + this.contextpath + '' + this.getRoute(routeSelector);
        console.log(url);
        return this.apiservice.post(url, object);
    }

    fetchAllStudents(routeSelector: string): any{
        const url = this.url + ':' + this.port + '' + this.contextpath + '' + this.getRoute(routeSelector);
        console.log(url);
        return this.apiservice.get(url);
    }

    private getRoute(routeSelector: string): string {
        switch (routeSelector) {
            case "savestudent":
                return "/save/student";
            case "fetchstudents":
                return "/fetch/students";
        }
    }

}