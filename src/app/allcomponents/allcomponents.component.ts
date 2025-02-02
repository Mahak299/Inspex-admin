import { Component, OnInit, TemplateRef } from '@angular/core';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-components',
  templateUrl: './allcomponents.component.html',
  styleUrl: './allcomponents.component.scss',
})
export class AllcomponentsComponent implements OnInit {
  getAllComp: any[] = [];
  componentName: string = '';
  editComponentName: string = '';
  editComponentId: number=0;

  
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.message = message;
  }

  dtOptions: Config = {};
  constructor(
    private modalService: NgbModal,
    private componentService: ComponentService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange: false,
      processing: true,

      language: {
        searchPlaceholder: 'Search Component',
      },
    };
    this.loadAllComponentData();
  }
  loadAllComponentData() {
    this.componentService.getAllComponents().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getAllComp = res.data;
      }
    });
  }
  onInputChange(value: string) {
    console.log('saved', value);
  }
  submitComponentName() {
    if (this.componentName.trim() === '') {
      this.toastr.warning('Please enter component name!');
      return;
    }
    this.componentService
      .createComponentName({ component_name: this.componentName })
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.componentName = '';
          this.toastr.success('Component Name saved successfully!');
          this.getAllComp = [];
          this.loadAllComponentData();
        } else if (res.status === 409) {
          this.toastr.error('Component Name already Exist!');
        } else {
          this.toastr.error('Something went wrong!');
        }
      });
  }
  openEditPopup(content: TemplateRef<any>,item:any) {
    this.editComponentName = item.component_name;
    this.editComponentId = item.component_id;
    this.modalService.open(content, { centered: true });
  }
  onSubmitEdit() {
    console.log(this.editComponentId,this.editComponentName);
    this.modalService.dismissAll();
  }
}
