import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EquiposAdminComponent } from './components/equipos-admin/equipos-admin.component';
import { EventosAdminComponent } from './components/eventos-admin/eventos-admin.component';
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
    SharedModule
  ]
})
export class AdminModule { } 