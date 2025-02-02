import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {
  constructor(private router: Router) { }

  onClickNavigate = (route: string) => {
    this.router.navigate([route]);
  }
}
