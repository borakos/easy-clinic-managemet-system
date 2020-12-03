import { Component, OnInit } from '@angular/core';
import { Appointment } from '../_providers/types';
import { Observable, of } from 'rxjs';
import { AppointmentService } from '../_services/appointment-service';
import { Logger } from '../_services/logger-service';

@Component({
	selector: 'app-manage-appointment-patient',
	templateUrl: './manage-appointment-patient.component.html',
	styleUrls: ['./manage-appointment-patient.component.scss']
})
export class ManageAppointmentPatientComponent implements OnInit {

	doctorsObservable: Observable<Appointment[]>
    error = undefined;

    constructor(private appointmentService: AppointmentService, private logger: Logger) { }

    ngOnInit(): void {
        /*this.doctorsObservable = this.doctorService.listDoctors(
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading doctors', err);
                return of();
            }
        );
        this.error = undefined;*/
    }

    deleteDoctor(id: number): void {
        /*this.doctorService.deleteDoctor(id)
        .subscribe(response => {}
            , err => {
                this.error = this.logger.errorLogWithReturnText('Delete doctor', err);
        });
        this.error = undefined;*/
    }
}
