import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './app-login/app-login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth-guard';

const routes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'',
        component: HomeComponent,
        canActivate: [AuthGuard],
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
