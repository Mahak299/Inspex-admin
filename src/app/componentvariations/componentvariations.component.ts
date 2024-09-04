import { Component, OnInit } from '@angular/core';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { AllcompService } from '../allcomp.service';

@Component({
  selector: 'app-component-variations',
  templateUrl: './componentvariations.component.html',
  styleUrl: './componentvariations.component.scss'
})
export class ComponentvariationsComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,
      
      language:{
        searchPlaceholder:'Enter Variation'
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
