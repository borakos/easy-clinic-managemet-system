import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserRole } from './types';

@Injectable()
export class JWTService{

	constructor(private jwtHelper:JwtHelperService){}

	userIsAdmin(): boolean {
        if (this.activeTokenIsValid()) {
			let token: string = localStorage.getItem("jwt");
            return (this.jwtHelper.decodeToken(token) as User).role === UserRole.Admin;
        } else {
            return false;
        }
	}

	getUserID(): number {
		if (this.activeTokenIsValid()) {
			let token: string = localStorage.getItem("jwt");
            return Number((this.jwtHelper.decodeToken(token) as User).id);
        } else {
            return Number.NaN;
        }
	}

	getUserRole(): UserRole | undefined {
		if (this.activeTokenIsValid()) {
			let token: string = localStorage.getItem("jwt");
            return (this.jwtHelper.decodeToken(token) as User).role;
        } else {
            return undefined;
        }
	}

	logout(): void {
		localStorage.removeItem("jwt");
	}

	activeTokenIsValid(): boolean {
		let token: string = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            return false;
        }
	}

	setActiveToken(token): void {
        localStorage.setItem("jwt", token);
	}
}