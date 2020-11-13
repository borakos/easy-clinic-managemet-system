import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, of } from 'rxjs';
import { AppointmentEvent, Doctor } from '../_providers/types';
import { isSameDay, isSameMonth} from 'date-fns';
import { DoctorService } from '../_services/doctor-service';
import { AppointmentService } from '../_services/appointment-service';

@Component({
    selector: 'app-apply-to-appointment',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './apply-to-appointment.component.html',
    styleUrls: ['./apply-to-appointment.component.scss']
})
export class ApplyToAppointmentComponent implements OnInit {

    @ViewChild('applyToAppointment', { static: true }) applyToAppointment: TemplateRef<any>;
    @ViewChild('selectDoctors', { static: false }) selectDoctors: TemplateRef<any>;
    @ViewChild('applicationSuccess', { static: true }) applicationSuccess: TemplateRef<any>;
    @ViewChild('applicationFailure', { static: true }) applicationFailure: TemplateRef<any>;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    doctorsObservable: Observable<Doctor[]>;
    eventsObservable: Observable<AppointmentEvent[]>;
    selectedDoctorId: number[] = [];
    storedDescription: string = '';
    error: string = undefined;
      
    actions: CalendarEventAction[] = [
        {
            label: '&#x270F',
            a11yLabel: 'Apply',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('apply', event);
            },
        }
    ];

    activeDayIsOpen: boolean = true;
    refresh: Subject<any> = new Subject();

    constructor(private modal: NgbModal, private doctorService: DoctorService, private appointmentService: AppointmentService) { 
        // this.eventsObservable = this.appointmentService.loadAppointmentsForPatient([0, 1], this.errorHandler('Loading appointments'));
    }

    ngOnInit(): void {
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    handleEvent(action: string, event: CalendarEvent): void {
        if(action === 'apply'){
            this.modal.open(this.applyToAppointment, { size: 'lg' }).closed
            .subscribe((result) => {
                if(result){
                    this.applyForAppointment(event.id as number, result);
                }
            }, err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Apply event', err);
            });
        }
    }

    showDoctors(): void {
        this.doctorsObservable = this.doctorService.listDoctorsWithFilter(this.errorHandler('List doctors with empty filter'));
        this.selectedDoctorId = [];
        this.modal.open(this.selectDoctors);
    }

    filterDoctors(filter: string): void {
        this.doctorsObservable = this.doctorService.listDoctorsWithFilter(this.errorHandler('List doctros with filter'), filter);
    }

    changeDoctors(select): void {
        this.selectedDoctorId = [];
        if(select){
            for(let i = 0; i < select.options.length; i++){
                if(select.options[i].selected){
                    let value = select.options[i].value.match(/'([0-9]+)'/);
                    this.selectedDoctorId.push(parseInt(value[1]));
                }
            }
        }
    }

    updateDoctorsAppointment(): void {
        this.eventsObservable = this.appointmentService.loadAppointmentsForPatient(this.selectedDoctorId, this.errorHandler('Load appointments for patients'));
    }

    applyForAppointment(eventId: number, data): void {
        let createdAppointment;
        let files = data.files;
        delete data.files;
        data.eventId = eventId;
        if(this.fileIsSelected(files)){
            let template= <File>files[0];
            let formData= new FormData();
            let file = formData.append('file', template, template.name)
            createdAppointment = this.appointmentService.createAppointment(data, file);
        } else {
            createdAppointment = this.appointmentService.createAppointment(data);
        }
        createdAppointment.subscribe((response) => {
            if(response){
                this.modal.open(this.applicationSuccess);
            } else {
                this.modal.open(this.applicationFailure).closed
                .subscribe((result) => {
                    if(result){
                        this.storedDescription = data.description;
                    } else {
                        this.storedDescription = '';
                    }
                }, err => {
                    this.error = 'Error ' + err.status + ': ' + err.error.message;
                    console.error('Save description', err);
                });
            }
            this.updateDoctorsAppointment();
        }, err => {
            this.error = 'Error ' + err.status + ': ' + err.error.message;
            console.error('Create appointment', err);
        });
    }

    errorHandler(errorTag: string): (any) => Observable<any> {
        return (err) => {
            console.error(errorTag, err);
            this.error = 'Error ' + err.status + ': ' + err.error.message;
            return of();
        }
    }
    
    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    fileIsSelected(files): boolean {
		if(files.length > 0){
			return true;
		} else {
			return false;
		}
	}
}
