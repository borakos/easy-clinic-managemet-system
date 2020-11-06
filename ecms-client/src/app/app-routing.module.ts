import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './app-login/app-login.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { EditPatientsComponent } from './edit-patients/edit-patients.component';
import { HomeComponent } from './home/home.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { PatientsRegistrationRequestComponent } from './patients-registration-request/patients-registration-request.component';
import { PatientsComponent } from './patients/patients.component';
import { PharmaciestComponent } from './pharmaciest/pharmaciest.component';
import { AdminGuard } from './_guards/admin-guard';
import { AuthGuard } from './_guards/auth-guard';
import { OutsiderGuard } from './_guards/outsider-guard';

const routes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'registration',
        component: PatientRegistrationComponent,
        canActivate: [OutsiderGuard]
    },
    {
        path:'patients/handle-registration-requests',
        component: PatientsRegistrationRequestComponent,
        canActivate: [AdminGuard]
    },
    {
        path:'patients',
        component: PatientsComponent,
        canActivate: [AdminGuard]
    },
    {
        path:'patients/edit/:id',
        component: EditPatientsComponent,
        canActivate: [AdminGuard]
    },
    {
        path:'doctors',
        component: DoctorsComponent,
        canActivate: [AdminGuard]
    },
    
    {
        path:'pharmacies',
        component: PharmaciestComponent,
        canActivate: [AdminGuard]
    },
    {
        path:'',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
