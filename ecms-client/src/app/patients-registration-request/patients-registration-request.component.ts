import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientService } from '../_services/patient-service';
import { Patient, Gender } from '../_providers/types';
import { Logger } from '../_services/logger-service';

@Component({
    selector: 'app-patients-registration-request',
    templateUrl: './patients-registration-request.component.html',
    styleUrls: ['./patients-registration-request.component.scss']
})
export class PatientsRegistrationRequestComponent implements OnInit {

    patientsObservable: Observable<Patient[]>
    Gender = Gender;
    error = undefined;

    constructor(private logger: Logger, private patientService: PatientService) { }

    ngOnInit(): void {
        this.loadPatients();
	}
	
	loadPatients(): void {
		this.patientsObservable = this.patientService.listApplicants(
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading pending registration requests', err);
                return of();
            }
        );
        this.error = undefined;
	}
    
    acceptPatient(id: number): void {
        this.patientService.acceptPatientRegistration(id)
        .subscribe(response => {
			this.loadPatients();
		}, err => {
            this.error = this.logger.errorLogWithReturnText('Accept patient', err);
        });
        this.error = undefined;
    }

    denyPatient(id: number): void {
        this.patientService.denyPatientRegistration(id)
        .subscribe(response => {
			this.loadPatients();
		}, err => {
            this.error = this.logger.errorLogWithReturnText('Deny patient', err);
        });
        this.error = undefined;
    }
}
