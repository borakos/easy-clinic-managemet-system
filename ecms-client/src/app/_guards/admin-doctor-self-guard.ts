import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JWTService } from '../_services/jwt-service';

@Injectable({
    providedIn: 'root'
})
export class AdminOrDoctorSelfGuard implements CanActivate {

    constructor(private jwtService: JWTService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.jwtService.userIsAdmin() || ((Number(route.paramMap.get('id')) === this.jwtService.getUserID()) && this.jwtService.userIsDoctor())) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}