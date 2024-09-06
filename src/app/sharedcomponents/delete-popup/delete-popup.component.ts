import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss'
})
export class DeletePopupComponent {
  modalService: any;
  openDeletePopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
