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
import { PackingDetailWorkshopComponent } from './workshop/packingList/packing-detail-workshop/packing-detail-workshop.component';
import { AddPackingListComponent } from './office/packing/add-packing-list/add-packing-list.component';
import { EditProjectComponent } from './office/project/edit-project/edit-project.component';
import { AddColliComponent } from './workshop/colli/add-colli/add-colli.component';
import {ProjectService} from './office/project/shared/project.service';
import {HttpClientModule} from '@angular/common/http';
import {PackingService} from './office/packing/shared/packing.service';
import { EditPackingComponent } from './office/packing/edit-packing/edit-packing.component';
import {ColliService} from './workshop/colli/shared/colli.service';
import { AdminComponent } from './admin/admin-detail/admin.component';
import { AdminProjectDetailComponent } from './admin/admin-project-detail/admin-project-detail.component';
import { AdminPackingDetailComponent } from './admin/admin-packing-detail/admin-packing-detail.component';
import { AdminColliDetailComponent } from './admin/admin-colli-detail/admin-colli-detail.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ColliDetailComponent } from './workshop/colli/colli-detail/colli-detail.component';
import { EditColliComponent } from './workshop/colli/edit-colli/edit-colli.component';
import { AddItemComponent } from './admin/item/add-item/add-item.component';
import { ItemService} from './admin/item/shared/item.service';
import { EditItemComponent } from './admin/item/edit-item/edit-item.component';
import {UtilityService} from './shared/utility.service';
import {PackItemService} from './office/packing/shared/pack-item.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'office', component: ProjectListComponent },
  { path: 'workshop', component: WorkshopPackingListComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'packingName', component: PackingDetailComponent },
  { path: 'packingDetailWorkshop/:id', component: PackingDetailWorkshopComponent },
  { path: 'addPackingList/:id', component: AddPackingListComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'addColli/:id', component: AddColliComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'packing-detail/:id', component: PackingDetailComponent },
  { path: 'edit-packing/:id', component: EditPackingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-project-detail/:id', component: AdminProjectDetailComponent },
  { path: 'admin-packing-detail/:id', component: AdminPackingDetailComponent },
  { path: 'admin-colli-detail/:id', component: AdminColliDetailComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'colli-detail/:id', component: ColliDetailComponent },
  { path: 'edit-colli/:id', component: EditColliComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'edit-item/:id', component: EditItemComponent },
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
    AddColliComponent,
    EditPackingComponent,
    AdminComponent,
    AdminProjectDetailComponent,
    AdminPackingDetailComponent,
    AdminColliDetailComponent,
    ManageUsersComponent,
    ColliDetailComponent,
    EditColliComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [ProjectService, PackingService, PackItemService, ColliService, ItemService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
