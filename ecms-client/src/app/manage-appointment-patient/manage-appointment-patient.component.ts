import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Appointment } from '../_providers/types';
import { Observable, of } from 'rxjs';
import { AppointmentService } from '../_services/appointment-service';
import { Logger } from '../_services/logger-service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-manage-appointment-patient',
	templateUrl: './manage-appointment-patient.component.html',
	styleUrls: ['./manage-appointment-patient.component.scss']
})
export class ManageAppointmentPatientComponent implements OnInit {

	@ViewChild('editAppointment', { static: true }) editAppointment: TemplateRef<any>;
    @ViewChild('editSuccess', { static: true }) editSuccess: TemplateRef<any>;
    @ViewChild('editFailure', { static: true }) editFailure: TemplateRef<any>;
	appointmentsObservable: Observable<Appointment[]>
	selectedAppointment: Appointment;
	storedDescription: string;
    error = undefined;

    constructor(private appointmentService: AppointmentService, private logger: Logger, private route: ActivatedRoute, private modal: NgbModal) { }

    ngOnInit(): void {
        this.updatePatientAppointment();
	}
	
	editAppointmentData(appointment: Appointment): void {
		console.log(appointment)
		this.selectedAppointment = appointment;
		this.storedDescription = appointment.description;
		this.modal.open(this.editAppointment, { size: 'lg'}).closed
		.subscribe((result) => {
			if (result) {
				this.saveEditAppointmentData(this.selectedAppointment.id as number, result);
			}
		}, err => {
			this.error = this.logger.errorLogWithReturnText('Edit event', err);
		});
	}

	saveEditAppointmentData(appointmentId: number, data): void {
        let editedAppointment;
        let files = data.files;
        delete data.files;
        data.eventId = appointmentId;
        if (this.fileIsSelected(files)) {
            let template = <File>files[0];
            let formData = new FormData();
            let file = formData.append('file', template, template.name)
            editedAppointment = this.appointmentService.editAppointment(data, file);
        } else {
            editedAppointment = this.appointmentService.editAppointment(data);
        }
        editedAppointment.subscribe((response) => {
            if (response) {
                this.modal.open(this.editSuccess);
            } else {
                this.modal.open(this.editFailure).closed
                    .subscribe((result) => {
                        if (result) {
                            this.storedDescription = data.description;
                        } else {
                            this.storedDescription = '';
                        }
                    }, err => {
                        this.error = this.logger.errorLogWithReturnText('Save description', err);
                    });
            }
            this.updatePatientAppointment();
        }, err => {
            this.error = this.logger.errorLogWithReturnText('Edit appointment', err);
        });
	}
	
	updatePatientAppointment(): void {
		this.appointmentsObservable = this.appointmentService.loadAppointmentsByPatients([this.route.snapshot.params['id']],
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading Appointments', err);
                return of();
            }
        );
        this.error = undefined;
	}

	fileIsSelected(files): boolean {
        if (files.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    deleteAppointment(id: number): void {
        this.appointmentService.deleteAppointment(id)
        .subscribe(response => {}
            , err => {
                this.error = this.logger.errorLogWithReturnText('Delete Appointments', err);
        });
        this.error = undefined;
    }
}
