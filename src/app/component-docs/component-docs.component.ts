import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-component-docs',
  templateUrl: './component-docs.component.html',
  styleUrl: './component-docs.component.scss',
})
export class ComponentDocsComponent implements OnInit {
  getAllCompDocs: any[] = [];
  getComponentVariation: any[] = [];
  getComponentType: any[] = [];
  getAllComponentName: any[] = [];
  selectedComponentName: string = 'Component Name';
  selectedComponentType: string = 'Component Type';
  selectedComponentVariation: string = 'Component Variation';
  componentId: number = 0;
  componentTypeId: number = 0;
  componentVariationId: number = 0;
  componentHeading: string = '';
  componentSubheading: string = '';
  componentDescription: string = '';

  openEditPopup(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'xl' });
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
        searchPlaceholder: 'Enter Docs',
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
    this.loadTableDocsData();
  }
  loadTableDocsData() {
    this.componentService.getAllComponentDocs().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getAllCompDocs = res.data;
      }
    });
  }
  onInputChange(value: string) {
    console.log('saved', value);
  }
  onSubmitDocs() {
    try {
      if (
        this.selectedComponentName === 'Component Name' ||
        this.selectedComponentType === 'Component Type' ||
        this.selectedComponentVariation === 'Component Variation' ||
        this.componentHeading.length === 0 ||
        this.componentDescription.length === 0 ||
        this.componentSubheading.length === 0
      ) {
        this.toastr.warning('Please enter all the inputs!');
        return;
      }
      const payload = {
        component_heading: this.componentHeading,
        component_subheading: this.componentSubheading,
        component_details: JSON.parse(this.componentDescription),
        component_id: this.componentId,
        component_type_id: this.componentTypeId,
        component_variant_id: this.componentVariationId,
      };
      console.log(payload);

      this.componentService
        .createComponentDocs(payload)
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.resetInput();
            this.toastr.success('Component Docs saved successfully!');
            this.getAllCompDocs = [];
            this.loadTableDocsData();
          } else if (res.status === 409) {
            this.toastr.error('Component Docs already Exist!');
          } else {
            this.toastr.error('Something went wrong!');
          }
        });
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
  resetInput() {
    this.componentHeading = '';
    this.componentSubheading = '';
    this.componentDescription = '';
    this.selectedComponentName = 'Component Name';
    this.selectedComponentType = 'Component Type';
    this.selectedComponentVariation = 'Component Variation';
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
