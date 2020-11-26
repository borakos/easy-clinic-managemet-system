import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentEvent, FactoryTemplateEvents } from '../_providers/types';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	loadAppointmentsForPatient(doctorIds: number[], loadingError: (any) => Observable<any>): Observable<AppointmentEvent[]> {
		return this.http.post<AppointmentEvent[]>('api/appointments/list-for-patient-select', {doctorIds: doctorIds} ,{
			headers: this.headerJson
		}).pipe(catchError(loadingError));;
	}

	applyAppointment(data, file = null): Observable<boolean> {
		return this.http.put<boolean>('api/appointments/apply', file, {params : data});
	}

	createAppointmentTime(intFrom: Date, intTo: Date, template: FactoryTemplateEvents): Observable<boolean>{
		return this.http.post<boolean>('api/appointments/create-by-factory', {
			from: intFrom,
			to: intTo,
			weekTemplate: template
		}, {
			headers: this.headerJson
		})
	}
}