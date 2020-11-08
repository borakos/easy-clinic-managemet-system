import { Component } from '@angular/core';
import { JWTService } from './_services/jwt-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Easy Clinic Management System';

    constructor(private jwtService: JWTService){}

    public isUserAuthenticated() {
        return this.jwtService.activeTokenIsValid();
    }

    public isRegistration(){
        if(window.location.pathname.startsWith('/registration')){
            return true;
        } else {
            return false;
        }
    }
}
