import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './utility/login/login.component';
import { ProjectListComponent } from './office/project/project-list/project-list.component';
import { WorkshopPackingListComponent } from './workshop/packingList/workshop-packing-list/workshop-packing-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './office/project/add-project/add-project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectDetailComponent } from './office/project/project-detail/project-detail.component';
import { PackingDetailComponent } from './office/packing/packing-detail/packing-detail.component';
import { PackingDetailWorkshopComponent } from './workshop/packing/packing-detail-workshop/packing-detail-workshop.component';
import { AddPackingListComponent } from './office/packing/add-packing-list/add-packing-list.component';
import { EditProjectComponent } from './office/project/edit-project/edit-project.component';
import { AddColliComponent } from './workshop/colli/add-colli/add-colli.component';
import {ProjectService} from './office/project/shared/project.service';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'office', component: ProjectListComponent },
  { path: 'workshop', component: WorkshopPackingListComponent },
  { path: 'add-packingList', component: AddProjectComponent },
  { path: 'projectName', component: ProjectDetailComponent },
  { path: 'packingName', component: PackingDetailComponent },
  { path: 'packingDetailWorkshop', component: PackingDetailWorkshopComponent },
  { path: 'addPackingList', component: AddPackingListComponent },
  { path: 'editProject', component: EditProjectComponent },
  { path: 'addColli', component: AddColliComponent },
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
    WorkshopPackingListComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    PackingDetailComponent,
    PackingDetailWorkshopComponent,
    AddPackingListComponent,
    EditProjectComponent,
    AddColliComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
