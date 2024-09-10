import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../sharedcomponents/delete-popup/delete-popup.component';
import { ComponentService } from '../shared/components/component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrl: './default-template.component.scss',
})
export class DefaultTemplateComponent implements OnInit {
  getAllTemplate: any[] = [];
  getComponentVariation: any[] = [];
  getComponentType: any[] = [];
  getAllComponentName: any[] = [];
  selectedComponentName: string = 'Component Name';
  selectedComponentType: string = 'Component Type';
  selectedComponentVariation: string = 'Component Variation';
  componentId: number = 0;
  componentTypeId: number = 0;
  componentVariationId: number = 0;
  defaultTemplate: string = '';
  componentConfig: string = '';
  editComponentName:string='';
  editComponentType:string='';
  editComponentVariation:string='';
  editComponentTypeId:number=0;
  editComponentVariationId:number=0;
  editComponentId:number=0;
  editDefaultTemplate:string='';
  editComponentConfig:string='';
  
  

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
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange: false,
      processing: true,

      language: {
        searchPlaceholder: 'Enter Template',
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
    this.loadTableDefaultData();
  }
  loadTableDefaultData() {
    this.componentService.getAllDefaultTemplate().subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.getAllTemplate = res.data;
      }
    });
  }
  onInputChange(value: string) {
    console.log('saved', value);
  }
  onSubmitDefaultTemplate(){
   try{
    if (
      this.selectedComponentName === 'Component Name' ||
      this.selectedComponentType === 'Component Type' ||
      this.selectedComponentVariation === 'Component Variation'||
      this.defaultTemplate.length===0||
      this.componentConfig.length===0
     ) {
      this.toastr.warning('Please enter all the inputs!');
      return;
    }
    const payload = {
      default_template:JSON.parse(this.defaultTemplate),
      component_config:JSON.parse(this.componentConfig),
      component_id: this.componentId,
      component_type_id: this.componentTypeId,
      component_variant_id: this.componentVariationId,
    };
    console.log(payload);
   
    this.componentService
      .createDefaultTemplate(payload).subscribe((res: any) => {
        if (res.status === 200) {
          this.resetInput();
          this.toastr.success('Component Docs saved successfully!');
          this.getAllTemplate = [];
          this.loadTableDefaultData();
        } else if (res.status === 409) {
          this.toastr.error('Component Docs already Exist!');
        } else {
          this.toastr.error('Something went wrong!');
        }
      });
   }
   catch(error:any){
    this.toastr.error(error.message);
   }
  }
  resetInput(){
    this.defaultTemplate=''
    this.componentConfig='';
    this.selectedComponentName='Component Name';
    this.selectedComponentType='Component Type';
  this.selectedComponentVariation= 'Component Variation';
  }
  openEditPopup(content: TemplateRef<any>,item:any) {
  this.editComponentName=item.components.component_name;
  this.editComponentId=item.components.component_id;
  this.editComponentType=item.component_types.component_type_name;
  this.editComponentTypeId=item.component_types.component_type_id;
  this.editComponentVariation=item.component_variant.component_variant_name;
  this.editComponentVariationId=item.component_variant.component_variant_id;
  this.editDefaultTemplate= JSON.stringify(item.default_template);
  this.editComponentConfig=JSON.stringify(item.component_config);
 
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  onSubmitEdit() {
    console.log(this.editDefaultTemplate,this.editComponentConfig,this.editComponentName,this.editComponentId,this.editComponentType,this.editComponentTypeId,
      this.editComponentVariation,this.editComponentVariationId
    );
    this.modalService.dismissAll();
  }
}
