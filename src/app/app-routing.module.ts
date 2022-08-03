import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerscienceactivityportalComponent } from './computerscienceactivityportal/computerscienceactivityportal.component';
import { ComputersciencequestionnairesComponent } from './computersciencequestionnaires/computersciencequestionnaires.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnglishactivityportalComponent } from './englishactivityportal/englishactivityportal.component';
import { EnglishquestionnairesComponent } from './englishquestionnaires/englishquestionnaires.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'englishactivityportal', component: EnglishactivityportalComponent },
  { path: 'englishquestionnaires', component: EnglishquestionnairesComponent },
  { path: 'computerscienceactivityportal', component: ComputerscienceactivityportalComponent },
  { path: 'computerquestionnaires', component: ComputersciencequestionnairesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
