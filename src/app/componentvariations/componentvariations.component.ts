import { Component, OnInit, TemplateRef } from '@angular/core';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';

@Component({
  selector: 'app-component-variations',
  templateUrl: './componentvariations.component.html',
  styleUrl: './componentvariations.component.scss'
})
export class ComponentvariationsComponent implements OnInit{
  
  getAllCompVariant:any[]=[];
   openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, { centered: true });
    modalRef.componentInstance.message = message;
  }
  
  dtOptions: Config = {};
  constructor(private componentService: ComponentService,private modalService: NgbModal){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,
      
      language:{
        searchPlaceholder:'Enter Variation'
      }
    };
    this.loadAllComponentData();
  }
  loadAllComponentData(){
    this.componentService.getAllComponentVariant().subscribe((res:any) => {
      if(res.status == 200){
        console.log(res);
        this.getAllCompVariant = res.data;
      }
    })
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
