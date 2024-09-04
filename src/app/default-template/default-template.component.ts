import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllcompService } from '../allcomp.service';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrl: './default-template.component.scss'
})
export class DefaultTemplateComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Search Template'
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
