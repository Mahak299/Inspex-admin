import { Component, OnInit, TemplateRef } from '@angular/core';
import { Config } from 'datatables.net'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  
  dtOptions: Config = {};
 
 ngOnInit(): void {
   this.dtOptions = {
     pagingType: 'simple_numbers',
     lengthChange:false,
     processing: true,

     language:{
       searchPlaceholder:'Search Template'
     }
   };
    }
 
}