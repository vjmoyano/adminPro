import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [





  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent},

];

@NgModule({
  declarations: [],
  imports: [

    PagesRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
