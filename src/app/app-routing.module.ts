import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllcomponentsComponent } from './allcomponents/allcomponents.component';
import { ComponenttypesComponent } from './componenttypes/componenttypes.component';
import { ComponentvariationsComponent } from './componentvariations/componentvariations.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path : 'login',component:AdminloginComponent},
 {path: '',component:LayoutComponent,children:[ {path : 'dashboard',component:DashboardComponent},
  {path : 'allcomponents',component:AllcomponentsComponent},
  {path: 'componenttypes',component:ComponenttypesComponent},
  {path: 'componentvariations',component:ComponentvariationsComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
