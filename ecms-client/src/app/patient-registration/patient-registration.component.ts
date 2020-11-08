import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientService } from '../_services/patient-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-patient-registration',
    templateUrl: './patient-registration.component.html',
    styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {

	uniqueName: boolean = true;
	error: string = undefined;
	successfullRegistration: boolean = false;

    constructor(private patientService: PatientService, private router: Router) { }

    ngOnInit(): void {
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

	fileIsSelected(files): boolean {
		if(files.length > 0){
			return true;
		} else {
			return false;
		}
	}

    registUser(form: NgForm, files) {
		let data=form.value;
		if(!this.passwordToShort(data.password) && !this.passwordNotMatch(data.password, data.repassword) && this.emailIsValid(data.email)){
			this.patientService.nameIsFree(data.userName).subscribe((response)=>{
				if(!response){
					this.uniqueName = false;
				}else{
					let createdUser = undefined
					if(this.fileIsSelected(files)){
						let template= <File>files[0];
						let formData= new FormData();
						let file = formData.append('file', template, template.name)
						createdUser = this.patientService.createPatient(data, file);
					} else {
						createdUser = this.patientService.createPatient(data);
					}
					createdUser.subscribe((response) => {
						this.successfullRegistration = response;
					}, err => {
						this.error = 'Error ' + err.status + ': ' + err.error.message;
						console.error('User registration', err);
					});
				}
			},err=>{
				this.error = 'Error ' + err.status + ': ' + err.error.message;
				console.error('User registration', err);
			})
		}
		this.uniqueName = true;
		this.error = undefined;
		this.successfullRegistration = false;
	}
}
