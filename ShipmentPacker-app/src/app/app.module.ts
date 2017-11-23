import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './utility/login/login.component';
import { ProjectListComponent } from './office/project/project-list/project-list.component';
import { WorkshopProjectListComponent } from './workshop/project/workshop-project-list/workshop-project-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'office', component: ProjectListComponent },
  { path: 'workshop', component: WorkshopProjectListComponent },
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
    WorkshopProjectListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
