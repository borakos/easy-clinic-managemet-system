import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JWTService } from '../_services/jwt-service';
import { Logger } from '../_services/logger-service';

@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss']
})
export class LoginComponent implements OnInit {
    
    invalidLogin: boolean;
    error: string;

    constructor(private http: HttpClient, private router: Router, private jwtService: JWTService, private logger: Logger) { }

    ngOnInit() {
        if (this.jwtService.activeTokenIsValid()) {
            this.router.navigate(["/"]);
        }
    }

    login(form: NgForm) {
        let credentials = JSON.stringify(form.value);
        this.http.post("api/auth/login", credentials, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe(response => {
            localStorage.setItem("jwt", response as string);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
        }, err => {
            this.invalidLogin = true;
            if(err.status === 401){
                this.error = 'Invalid username or password.';
            } else {
                this.error = this.logger.getErrorText(err);
            }
            console.error('Login', err);
        });
    }
}