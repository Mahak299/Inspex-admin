import { Component, OnInit } from '@angular/core';
import { AllcompService } from '../allcomp.service';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-componenttypes',
  templateUrl: './componenttypes.component.html',
  styleUrl: './componenttypes.component.scss'
})
export class ComponenttypesComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,
      paging:false,
      ordering:false,
      language:{
        searchPlaceholder:'Enter Component'
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
