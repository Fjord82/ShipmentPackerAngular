import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './utility/login/login.component';
import { ProjectListComponent } from './office/project/project-list/project-list/project-list.component';
import { WorkshopProjectListComponent } from './workshop/project/workshop-project-list/workshop-project-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectListComponent,
    WorkshopProjectListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
