import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AllcompService } from '../allcomp.service';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-component-docs',
  templateUrl: './component-docs.component.html',
  styleUrl: './component-docs.component.scss'
})
export class ComponentDocsComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
  
  openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true,size:"lg" });
	}
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService,private modalService: NgbModal){}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,

      language:{
        searchPlaceholder:'Search Docs'
      }
    };
    this.loadtablesdata();
  }
  loadtablesdata(){
    this.allcompservice.Loadtablesdata().subscribe(data=>
    {
      this.tablesdatalist=data;
    })
  }
  onSubmit() {
    console.log('Saved changes');
    this.modalService.dismissAll();
  }
}
