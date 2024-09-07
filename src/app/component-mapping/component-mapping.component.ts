import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';

@Component({
  selector: 'app-component-mapping',
  templateUrl: './component-mapping.component.html',
  styleUrl: './component-mapping.component.scss'
})
export class ComponentMappingComponent implements OnInit{
  
  getAllCompMapping:any[]=[];
  openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true,size:"lg" });
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
        searchPlaceholder:'Enter Mapping'
      }
    };
    this.loadAllComponentData();
  }
  loadAllComponentData(){
    this.componentService.getAllComponentMapping().subscribe((res:any) => {
      if(res.status == 200){
        console.log(res);
        this.getAllCompMapping = res.data;
      }
    })
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}