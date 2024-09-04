import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.scss'
})
export class UserTemplateComponent implements OnInit{
  
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
