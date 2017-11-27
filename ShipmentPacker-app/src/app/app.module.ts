import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './utility/login/login.component';
import { ProjectListComponent } from './office/project/project-list/project-list.component';
import { WorkshopProjectListComponent } from './workshop/project/workshop-project-list/workshop-project-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './office/project/add-project/add-project.component';
import {FormsModule} from '@angular/forms';
import { ProjectDetailComponent } from './office/project/project-detail/project-detail.component';
import { PackingDetailComponent } from './office/packing/packing-detail/packing-detail.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'office', component: ProjectListComponent },
  { path: 'workshop', component: WorkshopProjectListComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'projectName', component: ProjectDetailComponent },
  { path: 'packingName', component: PackingDetailComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectListComponent,
    WorkshopProjectListComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    PackingDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
