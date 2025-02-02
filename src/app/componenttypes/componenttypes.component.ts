import { Component, OnInit, TemplateRef } from '@angular/core';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-component-types',
  templateUrl: './componenttypes.component.html',
  styleUrl: './componenttypes.component.scss',
})
export class ComponenttypesComponent implements OnInit {
  getAllCompType: any[] = [];
  componentType: string = '';
  editComponentType:string='';
  editComponentTypeId:number=0;
  
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.message = message;
  }
  dtOptions: Config = {};
  constructor(
    private componentService: ComponentService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange: false,
      processing: true,
      language: {
        searchPlaceholder: 'Component Type',
      },
    };
    this.loadAllComponentData();
  }
  loadAllComponentData() {
    this.componentService.getAllComponentTypes().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getAllCompType = res.data;
      }
    });
  }
  onInputChange(value: string) {
    console.log('saved', value);
  }
  submitComponentType() {
    if (this.componentType.trim() === '') {
      this.toastr.warning('Please enter component type!');
      return;
    }
    this.componentService
      .createComponentType({ component_type_name: this.componentType })
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.componentType = '';
          this.toastr.success('Component Type saved successfully!');
          this.getAllCompType = [];
          this.loadAllComponentData();
        } else if (res.status === 409) {
          this.toastr.error('Component Type already Exist!');
        } else {
          this.toastr.error('Something went wrong!');
        }
      });
  }
  openEditPopup(content: TemplateRef<any>,item:any) {
    this.editComponentType=item.component_type_name;
    this.editComponentTypeId=item.component_type_id;
    this.modalService.open(content, { centered: true });
  }
  onSubmitEdit() {
    console.log(this.editComponentTypeId,this.editComponentType);
    this.modalService.dismissAll();
  }
}