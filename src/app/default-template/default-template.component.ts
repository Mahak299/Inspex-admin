import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AllcompService } from '../allcomp.service';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrl: './default-template.component.scss'
})
export class DefaultTemplateComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
 
  openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true,size:"lg" });
	}
  
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, { centered: true });
    modalRef.componentInstance.message = message;
  }
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService,private modalService: NgbModal){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Enter Template'
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
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
