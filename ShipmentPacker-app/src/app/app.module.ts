import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ProjectListComponent } from './office/project/project-list/project-list.component';
import { WorkshopPackingListComponent } from './workshop/packingList/workshop-packing-list/workshop-packing-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './office/project/add-project/add-project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectDetailComponent } from './office/project/project-detail/project-detail.component';
import { PackingDetailComponent } from './office/packing/packing-detail/packing-detail.component';
import { PackingDetailWorkshopComponent } from './workshop/packingList/packing-detail-workshop/packing-detail-workshop.component';
import { AddPackingListComponent } from './office/packing/add-packing-list/add-packing-list.component';
import { EditProjectComponent } from './office/project/edit-project/edit-project.component';
import { AddColliComponent } from './workshop/colli/add-colli/add-colli.component';
import {ProjectService} from './office/project/shared/project.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PackingService} from './office/packing/shared/packing.service';
import { EditPackingComponent } from './office/packing/edit-packing/edit-packing.component';
import {ColliService} from './workshop/colli/shared/colli.service';
import { AdminComponent } from './admin/admin-detail/admin.component';
import { AdminProjectDetailComponent } from './admin/admin-project-detail/admin-project-detail.component';
import { AdminPackingDetailComponent } from './admin/admin-packing-detail/admin-packing-detail.component';
import { AdminColliDetailComponent } from './admin/admin-colli-detail/admin-colli-detail.component';
import { ManageUsersComponent } from './admin/user/manage-users/manage-users.component';
import { ColliDetailComponent } from './workshop/colli/colli-detail/colli-detail.component';
import { EditColliComponent } from './workshop/colli/edit-colli/edit-colli.component';
import { AddItemComponent } from './admin/item/add-item/add-item.component';
import { ItemService} from './admin/item/shared/item.service';
import { EditItemComponent } from './admin/item/edit-item/edit-item.component';
import {UtilityService} from './shared/utility.service';
import { AdminProjectEditComponent } from './admin/admin-project-edit/admin-project-edit.component';
import { AdminColliEditComponent } from './admin/admin-colli-edit/admin-colli-edit.component';
import {PackItemService} from './office/packing/shared/pack-item.service';
import { AdminPackingEditComponent } from './admin/admin-packing-edit/admin-packing-edit.component';
import {ColliItemService} from './workshop/colli/shared/colli-item.service';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import {UserService} from './admin/user/shared/user.service';
import {FreightConditionService} from './admin/freightCondition/shared/freightCondition.service';
import { AddFreightConditionComponent } from './admin/freightCondition/add-freight-condition/add-freight-condition.component';
import { EditFreightConditionComponent } from './admin/freightCondition/edit-freight-condition/edit-freight-condition.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { NoAccessComponent } from './shared/no-access/no-access.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { TokenService } from './auth/shared/token.service';
import { LoginService } from './auth/shared/login.service';
import { OfficeGuard } from './auth/guards/office.guard';
import {WorkshopGuard} from './auth/guards/workshop.guard';
import {AdminGuard} from './auth/guards/admin.guard';

const appRoutes: Routes = [
  { path: 'office', component: ProjectListComponent, canActivate: [OfficeGuard]},
  { path: 'workshop', component: WorkshopPackingListComponent, canActivate:[WorkshopGuard]},
  { path: 'add-project', component: AddProjectComponent, canActivate: [OfficeGuard]},
  { path: 'packingName', component: PackingDetailComponent, canActivate: [OfficeGuard]},
  { path: 'packingDetailWorkshop/:id', component: PackingDetailWorkshopComponent, canActivate: [WorkshopGuard]},
  { path: 'addPackingList/:id', component: AddPackingListComponent, canActivate: [OfficeGuard]},
  { path: 'edit-project/:id', component: EditProjectComponent, canActivate: [OfficeGuard]},
  { path: 'addColli/:id', component: AddColliComponent, canActivate: [WorkshopGuard]},
  { path: 'project-detail/:id', component: ProjectDetailComponent, canActivate: [OfficeGuard] },
  { path: 'packing-detail/:id', component: PackingDetailComponent, canActivate: [OfficeGuard] },
  { path: 'edit-packing/:id', component: EditPackingComponent, canActivate: [OfficeGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'admin-project-detail/:id', component: AdminProjectDetailComponent, canActivate: [AdminGuard] },
  { path: 'admin-packing-detail/:id', component: AdminPackingDetailComponent, canActivate: [AdminGuard] },
  { path: 'admin-colli-detail/:id', component: AdminColliDetailComponent , canActivate: [AdminGuard]},
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AdminGuard] },
  { path: 'colli-detail/:id', component: ColliDetailComponent, canActivate: [WorkshopGuard] },
  { path: 'edit-colli/:id', component: EditColliComponent, canActivate: [WorkshopGuard]},
  { path: 'add-item', component: AddItemComponent, canActivate: [AdminGuard]},
  { path: 'edit-item/:id', component: EditItemComponent, canActivate: [AdminGuard] },
  { path: 'admin-edit-project/:id', component: AdminProjectEditComponent, canActivate: [AdminGuard] },
  { path: 'admin-edit-colli/:id', component: AdminColliEditComponent, canActivate: [AdminGuard] },
  { path: 'admin-edit-packing/:id', component: AdminPackingEditComponent, canActivate: [AdminGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AdminGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AdminGuard] },
  { path: 'add-freightCondition', component: AddFreightConditionComponent, canActivate: [AdminGuard] },
  { path: 'edit-freightCondition/:id', component: EditFreightConditionComponent, canActivate: [AdminGuard]},
  { path: 'no-access', component: NoAccessComponent},
  { path: 'login', component: LoginComponent },
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
    EditItemComponent,
    AdminProjectEditComponent,
    AdminColliEditComponent,
    AdminPackingEditComponent,
    AddUserComponent,
    AddFreightConditionComponent,
    EditFreightConditionComponent,
    EditUserComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],

  providers: [
    ProjectService,
    PackingService,
    PackItemService,
    ColliService,
    ItemService,
    ColliItemService,
    FreightConditionService,
    UtilityService,
    UserService,
    TokenService,
    LoginService,
    OfficeGuard,
    AdminGuard,
    WorkshopGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
