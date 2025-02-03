import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss'
})
export class DeletePopupComponent {
  @Input() message:any;
  @Output() onSubmit = new EventEmitter<boolean>();
  constructor(public activeModal: NgbActiveModal) {}
  
  confirmDelete(){
    this.onSubmit.emit(true);
  }

   
}