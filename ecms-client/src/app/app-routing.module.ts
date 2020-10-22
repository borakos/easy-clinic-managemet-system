import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './app-login/app-login.component';
import { HomeComponent } from './home/home.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
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
