import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientService } from '../_services/patient-service';
import { Patient, Gender } from '../_providers/types';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

    patientsObservable: Observable<Patient[]>
    Gender = Gender;
    error = undefined;

    constructor(private patientService: PatientService) { }

    ngOnInit(): void {
        this.patientsObservable = this.patientService.listPatients(
            (err) => {
                console.error('Loading patients', err);
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                return of();
            }
        );
        this.error = undefined;
    }

    deletePatient(id: number): void {
        this.patientService.deletePatient(id)
        .subscribe(response => {}
            , err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Delete patient', err);
        });
        this.error = undefined;
    }

}
