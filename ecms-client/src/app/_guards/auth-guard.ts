import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JWTService } from '../_services/jwt-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JWTService, private router: Router) {}

    canActivate() {
        if(this.jwtService.activeTokenIsValid()){
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}