import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tablesdata } from './tablesdata';

@Injectable({
  providedIn: 'root'
})
export class AllcompService {

  constructor(private http : HttpClient) { }
  Loadtablesdata(){
    return this.http.get<tablesdata[]>("http://localhost:3000/tablesdata");
  }   
}
