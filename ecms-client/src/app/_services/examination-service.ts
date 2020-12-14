import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentEvent, FactoryTemplateEvents, Examination } from '../_providers/types';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../_providers/types';

@Injectable({
    providedIn: 'root'
})
export class ExaminationService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	loadExaminationsByDoctors(doctorId: number, loadingError: (any) => Observable<any>): Observable<Examination[]> {
		return this.http.post<AppointmentEvent[]>('api/examinations/list-by-doctor', {doctorId: doctorId} ,{
			headers: this.headerJson
		}).pipe(catchError(loadingError));;
	}

	loadExaminationsByPatients(patientId: number, loadingError: (any) => Observable<any>): Observable<Examination[]> {
		return this.http.post<AppointmentEvent[]>('api/examinations/list-by-patient', {patientId: patientId} ,{
			headers: this.headerJson
		}).pipe(catchError(loadingError));;
	}

	applyAppointment(data, file = null): Observable<boolean> {
		return this.http.put<boolean>('api/appointments/apply', file, {params : data});
	}

	editExamination(data, file = null): Observable<boolean> {
		return this.http.put<boolean>('api/examinations/edit', file, {params : data});
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

	getAppointmentByEvent(eventId: number): Observable<Appointment> {
		return this.http.post<Appointment>('api/appointments/appointment-by-event', {id: eventId}, {
			headers: this.headerJson
		});
	}

	downloadMedicalReportForExamination(examinationId: number): Observable<Blob> {
		return this.http.get('api/examinations/downloadReport/' + examinationId, {
			responseType: 'blob'
		});
	} 

	deleteExamination(id: number): Observable<boolean> {
		return this.http.delete<boolean>('api/examinations/delete/' + id);
	}

	acceptApplication(id: number): Observable<boolean> {
		return this.http.post<boolean>('api/appointments/accept', {id: id}, {
			headers: this.headerJson
		});
	}

	editPrescription(data, file = null): Observable<boolean> {
		return this.http.put<boolean>('api/examinations/prescriptions', file, {params : data});
	}
}