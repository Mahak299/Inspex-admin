import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.scss'
})
export class UserTemplateComponent implements OnInit{
  
 
  openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  dtOptions: Config = {};
  constructor(private modalService: NgbModal){}

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
    onSubmit() {
      console.log('Saved changes');
      this.modalService.dismissAll();
    }
}
