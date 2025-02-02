import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.scss'
})
export class AdminloginComponent {
  constructor(private router:Router){}
  onSubmit(){
        this.router.navigate(['/dashboard']);
  }
}


