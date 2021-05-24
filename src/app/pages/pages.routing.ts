import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';



const routes: Routes = [
  {path: 'dashboard', component: PagesComponent,
  canActivate: [AuthGuard],
  children: [{path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
  {path: 'progress', component: ProgressComponent, data:{titulo: 'Progress Bar'} },
  {path: 'grafica1', component: Grafica1Component, data:{titulo: 'Grafica #1'} },
  {path: 'account-setting', component: AccountSettingsComponent, data:{titulo: 'Ajustes Cuenta'} },
  {path: "promesas", component: PromesasComponent, data:{titulo: 'Promesas'} },
  {path: "rxjs", component: RxjsComponent, data:{titulo: 'rxjs'} },
  {path: "perfil", component: PerfilComponent, data:{titulo: 'Perfil'} },


  //Mantenimientos
  {path: "usuarios", component: UsuariosComponent, data:{titulo: 'Usuarios de la aplicacion'} },
  {path: "hospitales", component: HospitalesComponent, data:{titulo: 'Hospitales de la aplicacion'} },
]

},

//Mantenimientos
//{path: "usuarios", component: UsuariosComponent , data:{titulos: "Usuarios de aplicacion"} }

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
