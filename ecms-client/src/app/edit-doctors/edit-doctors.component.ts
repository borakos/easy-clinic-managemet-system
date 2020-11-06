import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../_services/doctor-service';
import { Doctor } from '../_services/types';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-doctors',
    templateUrl: './edit-doctors.component.html',
    styleUrls: ['./edit-doctors.component.scss']
})
export class EditDoctorsComponent implements OnInit {

    uniqueName: boolean = true;
    passwordIsEnabled: boolean = false;
    doctor: Doctor;
    isUpdate: boolean = false;
    error = undefined;


    constructor(private doctorService: DoctorService, private route: ActivatedRoute, public location: Location) {
        let id = Number(this.route.snapshot.params.id);
        if(!Number.isNaN(id)){
            this.isUpdate = true;
            this.doctorService.getDoctor(id)
            .subscribe(response => {
                this.doctor = response as Doctor;
            }, err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Get doctor', err);
            });
            this.error = undefined;
        } else {
            this.isUpdate = false;
            this.passwordIsEnabled = true;
        }
    }

    ngOnInit(): void {
    }

    getDate(date: Date | undefined): string {
        return date?.toISOString().split('T')[0]
    }

    passwordToShort(password): boolean {
		if(password.length < 8){
			return true;
		} else {
			return false;
		}
	}

	passwordNotMatch(password, respassword): boolean {
		if(password !== respassword){
			return true;
		} else {
			return false;
		}
	}

	emailIsValid(email): boolean {
		if(!email || /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(email)){
			return true;
		} else {
			return false;
		}
	}
    
    invertPasswordVisibility(): void {
        this.passwordIsEnabled = !this.passwordIsEnabled;
    }

    registUser(form: NgForm) {
        let data = form.value;
		if(!this.passwordIsEnabled || (!this.passwordToShort(data.password) && !this.passwordNotMatch(data.password, data.repassword)) && this.emailIsValid(data.email)){
            this.doctorService.nameIsFree(data.userName).subscribe((response)=>{
				if(!response || (data.userName === '') && (data.userName !== this.doctor?.userName)){
					this.uniqueName = false;
				}else{
					let createUser = this.doctorService.createDoctor(data);
					createUser.subscribe((response) => {
                        this.location.back()
					}, err => {
						this.error = 'Error ' + err.status + ': ' + err.error.message;
						console.error('Doctor registration', err);
					});
				}
			},err=>{
				this.error = 'Error ' + err.status + ': ' + err.error.message;
				console.error('Doctor registration', err);
			})
		}
		this.uniqueName = true;
		this.error = undefined;
	}
}
