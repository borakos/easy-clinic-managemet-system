import { Component, OnInit } from '@angular/core';
import { JWTService } from '../_services/jwt-service';
import { UserRole } from '../_services/types';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(private jwtService: JWTService) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.jwtService.logout();
    }

    getPersonalRoute(): string {
        switch(this.jwtService.getUserRole()){
            case UserRole.Patient : return '/patients/edit/' + this.jwtService.getUserID();
            case UserRole.Doctor : return '/doctors/edit/' + this.jwtService.getUserID();
            case UserRole.Pharmacy : return '/pharmaciest/edit/' + this.jwtService.getUserID();
            default: return '';
        }
    }

    userIsAdmin(): boolean {
        return this.jwtService.userIsAdmin();
    }
}
