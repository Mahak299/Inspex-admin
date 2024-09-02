import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {
  constructor(private router:Router){}
  onClickAllcomponents(){
        this.router.navigate(['/allcomponents']);
  }
  onClickComponentTypes(){
    this.router.navigate(['/componenttypes'])
  }
  onClickComponentVariations(){
    this.router.navigate(['/componentvariations'])
  }
}
