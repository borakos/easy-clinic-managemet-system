import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, of } from 'rxjs';
import { AppointmentEvent, Doctor, FactoryTemplateEvents } from '../_providers/types';
import { isSameDay, isSameMonth, addHours } from 'date-fns';
import { DoctorService } from '../_services/doctor-service';
import { AppointmentService } from '../_services/appointment-service';
import { Logger } from '../_services/logger-service';
import { colors } from '../_providers/colors';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-manage-appointment',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './manage-appointment.component.html',
    styleUrls: ['./manage-appointment.component.scss']
})
export class ManageAppointmentComponent implements OnInit {

    @ViewChild('editAppointment', { static: true }) editAppointment: TemplateRef<any>;
    @ViewChild('editAppointmentFactory', { static: true }) editAppointmentFactory: TemplateRef<any>;
    @ViewChild('appointmentFactoryTemp', { static: false }) appointmentFactoryTemp: TemplateRef<any>;
    @ViewChild('applicationSuccess', { static: true }) applicationSuccess: TemplateRef<any>;
    @ViewChild('applicationFailure', { static: true }) applicationFailure: TemplateRef<any>;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    doctorsObservable: Observable<Doctor[]>;
    eventsObservable: Observable<AppointmentEvent[]>;
    selectedDoctorId: number[] = [];
    selectedEvent: CalendarEvent;
    error: string = undefined;
    selectedTime: Date = undefined;
    eventsByFactory: CalendarEvent[] = [];
    activeDayIsOpen: boolean = true;
    storedDescription: string = '';
    refresh: Subject<any> = new Subject();

    actions: CalendarEventAction[] = [
        {
            label: '&#x270F',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('edit', event);
            },
        },
        {
            label: '&#x1f5d1',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.eventsByFactory = this.eventsByFactory.filter((current) => current !== event);
            },
        }
    ];

    factoryActions: CalendarEventAction[] = [
        {
            label: '&#x270F',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.selectedEvent = event;
                this.handleEvent('edit_factory', event);
            },
        },
        {
            label: '&#x1f5d1',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.eventsByFactory = this.eventsByFactory.filter((current) => current !== event);
            },
        },
        {
            label: '&#x1F4CB',
            a11yLabel: 'Copy/Paste',
            onClick: ({ event }: { event }): void => {
                this.addNewEventFactory(event.start, event.end, event.duration);
            },
        }
    ];

    constructor(private route: ActivatedRoute, private logger: Logger, private modal: NgbModal, private doctorService: DoctorService, private appointmentService: AppointmentService) {
    }

    ngOnInit(): void {
    }

    getDoctorId(): number {
        return this.route.snapshot.params['id'];
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
        switch(action){
            case 'edit' : {
                this.modal.open(this.editAppointment, { size: 'lg'}).closed
                .subscribe((result) => {
                    if (result) {
                        this.applyForAppointment(event.id as number, result);
                    }
                }, err => {
                    this.error = this.logger.errorLogWithReturnText('Edit event', err);
                });
            }; break;
            case 'edit_factory' : {
                this.modal.open(this.editAppointmentFactory).closed
                .subscribe((result) => {
                    if (result) {
                        this.editFactoryEvent(event, result);    
                    }
                }, err => {
                    this.error = this.logger.errorLogWithReturnText('Edit_factory event', err);
                });
            }; break;
        };
    }

    isFactoryTemplateCorrect(start, end): boolean {
        if(start && end && (this.eventsByFactory.length > 0)){
            let startDate = new Date(start);
            let endDate = new Date(end);
            if(startDate.valueOf() <= endDate.valueOf()){
                return true;
            }
        }
        return false;
    }

    editFactoryEvent(event, result): void {
        event.duration = (result.duration / 60).toPrecision(2);
        let time: string[] = result.from.split(':');
        if(time.length === 2)   {
            event.start.setHours(parseInt(time[0]), parseInt(time[1]), 0);
        }
        time = result.to.split(':');
        if(time.length === 2)   {
            event.end.setHours(parseInt(time[0]), parseInt(time[1]), 0);
        }
        this.refresh.next();
    }

    calculateIndividualEvents(events: any[]): CalendarEvent[] {
        let calculatedEvents: CalendarEvent[] = [];
        for(let event of events) {
            let duration = (event.end.valueOf() - event.start.valueOf()) / (60 * 60 * 1000);
            let eventCount = Math.floor(duration / event.duration);
            for(let i = 0; i < eventCount; i++){
                calculatedEvents.push({
                    start: this.addHours(event.start, i * event.duration),
                    end:  this.addHours(event.start, (i + 1) * event.duration),
                    title: 'Appointment ' + calculatedEvents.length,
                    color: colors.blue,
                    actions: this.factoryActions,
                    duration: event.duration,
                    resizable: {
                        beforeStart: true,
                        afterEnd: true,
                    },
                    draggable: true,
                } as CalendarEvent);
            }
        }
        return calculatedEvents;
    }

    addHours(date: Date, hours: number): Date {
        return new Date(date.valueOf() + hours * 60 * 60 * 1000);
    }

    filterDoctors(filter: string): void {
        this.doctorsObservable = this.doctorService.listDoctorsWithFilter(this.errorHandler('List doctros with filter'), filter);
    }

    changeDoctors(select): void {
        this.selectedDoctorId = [];
        if (select) {
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].selected) {
                    let value = select.options[i].value.match(/'([0-9]+)'/);
                    this.selectedDoctorId.push(parseInt(value[1]));
                }
            }
        }
    }

    appointmentFactory(): void {
        this.eventsByFactory = [];
        this.modal.open(this.appointmentFactoryTemp, { size: 'lg' }).closed
        .subscribe((result) => {
            if(result && (this.isFactoryTemplateCorrect(result.from, result.to))) {
                this.appointmentService.createAppointmentTime(new Date(result.from), new Date(result.to), this.createWeeklyTemplate())
                .subscribe((result) => { }, err => {
                    this.error = this.logger.errorLogWithReturnText('Save appointment factory request', err);
                });
            }
        }, err => {
            this.error = this.logger.errorLogWithReturnText('Save appointment factory', err);
        });
    }

    updateDoctorsAppointment(): void {
        this.eventsObservable = this.appointmentService.loadAppointmentsForPatient(this.selectedDoctorId, this.errorHandler('Load appointments for patients'));
    }

    applyForAppointment(eventId: number, data): void {
        let createdAppointment;
        let files = data.files;
        delete data.files;
        data.eventId = eventId;
        if (this.fileIsSelected(files)) {
            let template = <File>files[0];
            let formData = new FormData();
            let file = formData.append('file', template, template.name)
            createdAppointment = this.appointmentService.applyAppointment(data, file);
        } else {
            createdAppointment = this.appointmentService.applyAppointment(data);
        }
        createdAppointment.subscribe((response) => {
            if (response) {
                this.modal.open(this.applicationSuccess);
            } else {
                this.modal.open(this.applicationFailure).closed
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
            this.updateDoctorsAppointment();
        }, err => {
            this.error = this.logger.errorLogWithReturnText('Create appointment', err);
        });
    }

    createWeeklyTemplate() : FactoryTemplateEvents {
        this.calculateFactoryEvents();
        let dict: FactoryTemplateEvents = {};
        let days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for(let day of days) {
            dict[day] = [];
        }
        for(let event of this.eventsByFactory) {
            dict[days[event.start.getUTCDay()]].push({
                start: event.start.getUTCHours() + ':' + event.start.getUTCMinutes(),
                end: event.end.getUTCHours() + ':' + event.end.getUTCMinutes()
            });
        }
        return dict;
    }

    calculateFactoryEvents(): void {
        this.eventsByFactory = this.calculateIndividualEvents(this.eventsByFactory);
    }

    addNewEventFactory(from: Date, end?: Date, duration?: number): void {
        this.eventsByFactory.push({
            start: from,
            end: end ? end : addHours(from, 1),
            title: 'Appointment ' + this.eventsByFactory.length,
            color: colors.blue,
            actions: this.factoryActions,
            duration: duration ? duration : 0.5,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        } as CalendarEvent);
        this.refresh.next();
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        this.eventsByFactory = this.eventsByFactory.map((current) => {
            if (current === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return current;
        });
    }

    errorHandler(errorTag: string): (any) => Observable<any> {
        return (err) => {
            this.error = this.logger.errorLogWithReturnText(errorTag, err);
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
        if (files.length > 0) {
            return true;
        } else {
            return false;
        }
    }

}
