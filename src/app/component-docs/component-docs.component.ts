import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllcompService } from '../allcomp.service';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-component-docs',
  templateUrl: './component-docs.component.html',
  styleUrl: './component-docs.component.scss'
})
export class ComponentDocsComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Search Docs'
      }
    };
    this.loadtablesdata();
  }
  loadtablesdata(){
    this.allcompservice.Loadtablesdata().subscribe(data=>
    {
      this.tablesdatalist=data;
    })
  }
}
