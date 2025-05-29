import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { EquipoDetalleComponent } from './pages/equipos/equipo-detalle/equipo-detalle.component';
import { EventoDetalleComponent } from './pages/evento-detalle/evento-detalle/evento-detalle.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'equipos/:id', component: EquipoDetalleComponent },
  { path: 'eventos/:id', component: EventoDetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account', component: ActivateAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
