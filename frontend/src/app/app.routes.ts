import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { AppointmentTableComponent } from './appointments/appointment-table/appointment-table.component';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: CreateProfileComponent },
  { path: 'appointments', component: AppointmentTableComponent },
  { path: 'appointments/create', component: AppointmentFormComponent },
  { path: 'appointments/edit/:id', component: AppointmentFormComponent }
]