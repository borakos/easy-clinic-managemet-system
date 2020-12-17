import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientService } from '../_services/patient-service';
import { Patient, Gender } from '../_providers/types';
import { Logger } from '../_services/logger-service';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

    patientsObservable: Observable<Patient[]>
    Gender = Gender;
    error = undefined;

    constructor(private logger: Logger, private patientService: PatientService) { }

    ngOnInit(): void {
		/*this.patientService.listPatients(
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading patients', err);
                return of();
            }
        ).subscribe(result => {
			console.log(result)
		})*/
        this.loadPatients();
    }

    deletePatient(id: number): void {
        this.patientService.deletePatient(id)
        .subscribe(response => {
			this.loadPatients();
		}, err => {
                this.error = this.logger.errorLogWithReturnText('Delete patient', err);
        });
        this.error = undefined;
    }

	loadPatients(): void {
		this.patientsObservable = this.patientService.listPatients(
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading patients', err);
                return of();
            }
        );
        this.error = undefined;
	}
}
