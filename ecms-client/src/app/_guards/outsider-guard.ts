import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class OutsiderGuard implements CanActivate {

    constructor(private jwtHelper: JwtHelperService, private router: Router) {}

    canActivate() {
        var token = localStorage.getItem("jwt");

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}