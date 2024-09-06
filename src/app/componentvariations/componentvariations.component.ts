import { Component, OnInit, TemplateRef } from '@angular/core';
import { tablesdata } from '../tablesdata';
import { Config } from 'datatables.net';
import { AllcompService } from '../allcomp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-component-variations',
  templateUrl: './componentvariations.component.html',
  styleUrl: './componentvariations.component.scss'
})
export class ComponentvariationsComponent implements OnInit{
  
  tablesdatalist:tablesdata[]=[];
   openEditPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  dtOptions: Config = {};
  constructor(private allcompservice:AllcompService,private modalService: NgbModal){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthChange:false,
      processing: true,
      
      language:{
        searchPlaceholder:'Enter Variation'
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
