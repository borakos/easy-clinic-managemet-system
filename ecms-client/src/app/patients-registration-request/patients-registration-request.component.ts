import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientService } from '../_services/patient-service';
import { Patient, Gender } from '../_providers/types';

@Component({
    selector: 'app-patients-registration-request',
    templateUrl: './patients-registration-request.component.html',
    styleUrls: ['./patients-registration-request.component.scss']
})
export class PatientsRegistrationRequestComponent implements OnInit {

    patientsObservable: Observable<Patient[]>
    Gender = Gender;
    error = undefined;

    constructor(private patientService: PatientService) { }

    ngOnInit(): void {
        this.patientsObservable = this.patientService.listApplicants(
            (err) => {
                console.error('Loading pendig registration requests', err);
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                return of();
            }
        );
        this.error = undefined;
    }
    
    acceptPatient(id: number): void {
        this.patientService.acceptPatientRegistration(id)
        .subscribe(response => {}
        , err => {
            this.error = 'Error ' + err.status + ': ' + err.error.message;
            console.error('Accept patient', err);
        });
        this.error = undefined;
    }

    denyPatient(id: number): void {
        this.patientService.denyPatientRegistration(id)
        .subscribe(response => {}
        , err => {
            this.error = 'Error ' + err.status + ': ' + err.error.message;
            console.error('Deny patient', err);
        });
        this.error = undefined;
    }
}
