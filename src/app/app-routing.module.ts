import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllcomponentsComponent } from './allcomponents/allcomponents.component';
import { ComponenttypesComponent } from './componenttypes/componenttypes.component';
import { ComponentvariationsComponent } from './componentvariations/componentvariations.component';
import { LayoutComponent } from './layout/layout.component';
import { ComponentMappingComponent } from './component-mapping/component-mapping.component';
import { ComponentDocsComponent } from './component-docs/component-docs.component';
import { DefaultTemplateComponent } from './default-template/default-template.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { UserTemplateComponent } from './user-template/user-template.component';

const routes: Routes = [
  { path : 'login',component:AdminloginComponent},
 {path: '',component:LayoutComponent,children:[ {path : 'dashboard',component:DashboardComponent},
  {path : 'all-components',component:AllcomponentsComponent},
  {path: 'component-types',component:ComponenttypesComponent},
  {path: 'component-variations',component:ComponentvariationsComponent},
{path:'component-mapping',component:ComponentMappingComponent},
{path:'component-docs',component:ComponentDocsComponent},
{path:'default-template',component:DefaultTemplateComponent},
{path:'all-users',component:AllUsersComponent},
{path:'user-library',component:UserLibraryComponent},
{path:'user-template',component:UserTemplateComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
