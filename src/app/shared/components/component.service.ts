import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http: HttpClient) { }

  getAllComponents(){
    return this.http.get(env.apiURL+'component/all');
  }

  getAllComponentTypes(){
    return this.http.get(env.apiURL+'component-types/all');
  }

  getAllComponentVariant(){
    return this.http.get(env.apiURL+'/component-variant/all');
  }
  getAllComponentMapping(){
    return this.http.get(env.apiURL+'/component-mapping/all')
  }

  getAllComponentDocs(){
    return this.http.get(env.apiURL+'/component-docs/all')
  }
  getAllDefaultTemplate(){
    return this.http.get(env.apiURL+'/component-default-template/all')
  }
}