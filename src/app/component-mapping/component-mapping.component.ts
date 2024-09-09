import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-component-mapping',
  templateUrl: './component-mapping.component.html',
  styleUrl: './component-mapping.component.scss',
})
export class ComponentMappingComponent implements OnInit {
  getAllCompMapping: any[] = [];
  getAllComponentName: any[] = [];
  getComponentType: any[] = [];
  getComponentVariation: any[] = [];
  selectedComponentName: string = 'Component Name';
  selectedComponentType: string = 'Component Type';
  selectedComponentVariation: string = 'Component Variation';
  componentId: number = 0;
  componentTypeId: number = 0;
  componentVariationId: number = 0;
  openEditPopup(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  openDeletePopup(message: string) {
    const modalRef = this.modalService.open(DeletePopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.message = message;
  }
  dtOptions: Config = {};
  constructor(
    private componentService: ComponentService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange: false,
      processing: true,

      language: {
        searchPlaceholder: 'Enter Mapping',
      },
    };
    this.loadAllComponentData();
  }
  setComponentName(name: any, id: any) {
    console.log(name, id);
    this.selectedComponentName = name;
    this.componentId = id;
  }
  setComponentType(name: any, id: any) {
    console.log(name, id);
    this.selectedComponentType = name;
    this.componentTypeId = id;
  }
  setComponentVariation(name: any, id: any) {
    console.log(name, id);
    this.selectedComponentVariation = name;
    this.componentVariationId = id;
  }
  loadAllComponentData() {
    this.componentService.getAllComponents().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getAllComponentName = res.data;
      }
    });
    this.componentService.getAllComponentTypes().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getComponentType = res.data;
      }
    });
    this.componentService.getAllComponentVariant().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getComponentVariation = res.data;
      }
    });
    this.loadTableMappingData();
  }
  loadTableMappingData() {
    this.componentService.getAllComponentMapping().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getAllCompMapping = res.data;
      }
    });
  }
  onSubmitMapping() {
    const payload = {
      component_id: this.componentId,
      component_type_id: this.componentTypeId,
      component_variant_id: this.componentVariationId,
    };
    console.log(payload);
    if (
      this.selectedComponentName === 'Component Name' ||
      this.selectedComponentType === 'Component Type' ||
      this.selectedComponentVariation === 'Component Variation'
    ) {
      this.toastr.warning('Please enter component Mapping dropdown value!');
      return;
    }
    this.componentService
      .createComponentMapping(payload)
      .subscribe((res: any) => {
        if (res.status === 200) {
            this.selectedComponentName='Component Name';
            this.selectedComponentType='Component Type';
          this.selectedComponentVariation= 'Component Variation'; 
          this.toastr.success('Component Mapping saved successfully!');
          this.getAllCompMapping = [];
          this.loadTableMappingData();
        } else if (res.status === 409) {
          this.toastr.error('Component Mapping already Exist!');
        } else {
          this.toastr.error('Something went wrong!');
        }
      });
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
