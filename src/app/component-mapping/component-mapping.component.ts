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
  editComponentName:string='';
  editComponentType:string='';
  editComponentVariation:string='';
  editComponentTypeId:number=0;
  editComponentVariationId:number=0;
  editComponentId:number=0;
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
  editComponentVariations(name: any, id: any) {
    console.log(name, id);
    this.editComponentVariation = name;
    this.editComponentVariationId = id;
  }
  editComponentTypes(name: any, id: any) {
    console.log(name, id);
    this.editComponentType = name;
    this.editComponentTypeId = id;
  }
  editComponentNames(name: any, id: any) {
    console.log(name, id);
    this.editComponentName = name;
    this.editComponentId = id;
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
  openEditPopup(content: TemplateRef<any>,item:any) {
    this.editComponentName=item.components.component_name;
    this.editComponentId=item.components.component_id;
    this.editComponentType=item.component_types.component_type_name;
    this.editComponentTypeId=item.component_types.component_type_id;
    this.editComponentVariation=item.component_variant.component_variant_name;
    this.editComponentVariationId=item.component_variant.component_variant_id;
    this.modalService.open(content, { centered: true, size: 'lg' });
       
  }
  onSubmitEdit() {
    console.log(this.editComponentName,this.editComponentId,this.editComponentType,this.editComponentTypeId,
      this.editComponentVariation,this.editComponentVariationId
    );
    this.modalService.dismissAll();
  }
}
