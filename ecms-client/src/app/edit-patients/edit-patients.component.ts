import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../_services/patient-service';
import { Patient } from '../_providers/types';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-edit-patients',
    templateUrl: './edit-patients.component.html',
    styleUrls: ['./edit-patients.component.scss']
})
export class EditPatientsComponent implements OnInit {

    uniqueName: boolean = true;
    passwordIsEnabled: boolean = false;
    patient: Patient;
    isUpdate: boolean = false;
    error = undefined;

    constructor(private patientService: PatientService, private route: ActivatedRoute, public location: Location) {
        let id = Number(this.route.snapshot.params.id);
        if(!Number.isNaN(id)){
            this.isUpdate = true;
            this.patientService.getPatient(id)
            .subscribe(response => {
                this.patient = response as Patient;
            }, err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Get patient', err);
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

	fileIsSelected(files): boolean {
		if(files.length > 0){
			return true;
		} else {
			return false;
		}
    }
    
    invertPasswordVisibility(): void {
        this.passwordIsEnabled = !this.passwordIsEnabled;
    }

    registUser(form: NgForm, files) {
        let data = form.value;
		if(!this.passwordIsEnabled || (!this.passwordToShort(data.password) && !this.passwordNotMatch(data.password, data.repassword)) && this.emailIsValid(data.email)){
            this.patientService.nameIsFree(data.userName).subscribe((response)=>{
				if(!response || (data.userName === '') && (data.userName !== this.patient?.userName)){
					this.uniqueName = false;
				}else{
					let createUser = undefined
					if(this.fileIsSelected(files)){
						let template= <File>files[0];
						let formData= new FormData();
						let file = formData.append('file', template, template.name)
						createUser = this.patientService.createPatient(data, file);
					} else {
						createUser = this.patientService.createPatient(data);
					}
					createUser.subscribe((response) => {
                        this.location.back()
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
	}
}
