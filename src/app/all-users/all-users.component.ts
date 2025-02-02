import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit{
  
   dtOptions: Config = {};
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Search Users'
      }
    };
     }
  
}
