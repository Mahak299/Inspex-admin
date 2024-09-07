import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';

@Component({
  selector: 'app-component-docs',
  templateUrl: './component-docs.component.html',
  styleUrl: './component-docs.component.scss'
})
export class ComponentDocsComponent implements OnInit{
  
  getAllCompDocs:any[]=[];
  
  openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true,size:"xl" });
	}
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, { centered: true });
    modalRef.componentInstance.message = message;
  }
  dtOptions: Config = {};
  constructor(private componentService:ComponentService,private modalService: NgbModal){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Enter Docs'
      }
    };
    this.loadAllComponentData();
  }
  loadAllComponentData(){
    this.componentService.getAllComponentDocs().subscribe((res:any) => {
      if(res.status == 200){
        console.log(res);
        this.getAllCompDocs = res.data;
      }
    })
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
