import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidepanelComponent } from './sharedcomponents/sidepanel/sidepanel.component';
import { HeaderComponent } from './sharedcomponents/header/header.component';
import { AllcomponentsComponent } from './allcomponents/allcomponents.component';
import { provideHttpClient } from '@angular/common/http';
import { ComponenttypesComponent } from './componenttypes/componenttypes.component';
import { ComponentvariationsComponent } from './componentvariations/componentvariations.component';
import { LayoutComponent } from './layout/layout.component';
import { ComponentMappingComponent } from './component-mapping/component-mapping.component';
import { ComponentDocsComponent } from './component-docs/component-docs.component';
import { DefaultTemplateComponent } from './default-template/default-template.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { UserTemplateComponent } from './user-template/user-template.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    DashboardComponent,
    SidepanelComponent,
    HeaderComponent,
    AllcomponentsComponent,
    ComponenttypesComponent,
    ComponentvariationsComponent,
    LayoutComponent,
    ComponentMappingComponent,
    ComponentDocsComponent,
    DefaultTemplateComponent,
    AllUsersComponent,
    UserLibraryComponent,
    UserTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
