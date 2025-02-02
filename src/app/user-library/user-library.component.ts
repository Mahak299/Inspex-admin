import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrl: './user-library.component.scss'
})
export class UserLibraryComponent implements OnInit{
  
  dtOptions: Config = {};
 
 ngOnInit(): void {
   this.dtOptions = {
     pagingType: 'simple_numbers',
     lengthChange:false,
     processing: true,

     language:{
       searchPlaceholder:'Search Library'
     }
   };
    }
 
}
