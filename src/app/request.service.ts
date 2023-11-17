import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url = 'http://localhost:3000/api'
  constructor(private httpClient:HttpClient) { }

  request(endpoint=''):Observable<any>{
    return this.httpClient.get<any>(this.url + endpoint);
  }

}

