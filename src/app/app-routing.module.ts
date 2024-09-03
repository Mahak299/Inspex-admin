import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllcomponentsComponent } from './allcomponents/allcomponents.component';
import { ComponenttypesComponent } from './componenttypes/componenttypes.component';
import { ComponentvariationsComponent } from './componentvariations/componentvariations.component';
import { LayoutComponent } from './layout/layout.component';
import { ComponentMappingComponent } from './component-mapping/component-mapping.component';

const routes: Routes = [
  { path : 'login',component:AdminloginComponent},
 {path: '',component:LayoutComponent,children:[ {path : 'dashboard',component:DashboardComponent},
  {path : 'all-components',component:AllcomponentsComponent},
  {path: 'component-types',component:ComponenttypesComponent},
  {path: 'component-variations',component:ComponentvariationsComponent},
{path:'component-mapping',component:ComponentMappingComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
