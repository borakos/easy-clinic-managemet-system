import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../_services/pharmacy-service';
import { Pharmacy } from '../_services/types';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-edit-pharmacies',
    templateUrl: './edit-pharmacies.component.html',
    styleUrls: ['./edit-pharmacies.component.scss']
})
export class EditPharmaciesComponent implements OnInit {

    uniqueName: boolean = true;
    passwordIsEnabled: boolean = false;
    pharmacy: Pharmacy;
    isUpdate: boolean = false;
	error = undefined;
	supportDelivery: boolean = false;
	supportPreOrder: boolean = false;

    constructor(private pharmacyService: PharmacyService, private route: ActivatedRoute, public location: Location) {
        let id = Number(this.route.snapshot.params.id);
        if(!Number.isNaN(id)){
            this.isUpdate = true;
            this.pharmacyService.getPharmacy(id)
            .subscribe(response => {
				this.pharmacy = response as Pharmacy;
				this.supportDelivery = this.pharmacy.supportDelivery;
				this.supportPreOrder = this.pharmacy.supportPreOrder;
            }, err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Get pharmacy', err);
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

	invertDeliverySupport(): void {
        this.supportDelivery = !this.supportDelivery;
	}

	invertPreOrderSupport(): void {
        this.supportPreOrder = !this.supportPreOrder;
	}

    registUser(form: NgForm) {
		let data = form.value;
		data.supportDelivery = this.supportDelivery;
		data.supportPreOrder = this.supportPreOrder;
		console.log(data)
		if(!this.passwordIsEnabled || (!this.passwordToShort(data.password) && !this.passwordNotMatch(data.password, data.repassword)) && this.emailIsValid(data.email)){
            this.pharmacyService.nameIsFree(data.userName).subscribe((response)=>{
				if(!response || (data.userName === '') && (data.userName !== this.pharmacy?.userName)){
					this.uniqueName = false;
				}else{
					let createPharmacy = this.pharmacyService.createPharmacy(data);
					createPharmacy.subscribe((response) => {
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
