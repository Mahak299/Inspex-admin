import { Component, OnInit, TemplateRef } from '@angular/core';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';


@Component({
  selector: 'app-all-components',
  templateUrl: './allcomponents.component.html',
  styleUrl: './allcomponents.component.scss',
  })
export class AllcomponentsComponent implements OnInit{
  
  tablesdatalist:any[]=[];
 
  openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, { centered: true });
    modalRef.componentInstance.message = message;
  }
  
  dtOptions: Config = {};
  constructor(private modalService: NgbModal,
              private componentService: ComponentService 
  ){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Search Component'
      }
    };
    this.loadAllComponentData();
  }
  loadAllComponentData(){
    this.componentService.getAllComponents().subscribe((res:any) => {
      if(res.status == 200){
        console.log(res);
        this.tablesdatalist = res.data;
      }
    })
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
