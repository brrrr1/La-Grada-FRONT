import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EquiposAdminComponent } from './components/equipos-admin/equipos-admin.component';
import { EventosAdminComponent } from './components/eventos-admin/eventos-admin.component';
import { NotificationModule } from '../../components/notification/notification.module';
import { SharedModule } from '../../components/modal/modal/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    EquiposAdminComponent,
    EventosAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NotificationModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { } 