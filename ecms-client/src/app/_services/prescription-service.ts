import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentEvent, FactoryTemplateEvents, Examination, Prescription } from '../_providers/types';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../_providers/types';

@Injectable({
    providedIn: 'root'
})
export class PrescriptionService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	loadPrescriptionsByPatients(patientId: number, loadingError: (any) => Observable<any>): Observable<Prescription[]> {
		return this.http.post<AppointmentEvent[]>('api/prescriptions/list-by-patient', {patientId: patientId} ,{
			headers: this.headerJson
		}).pipe(catchError(loadingError));;
	}

	downloadMedicalReportForPrescription(examinationId: number): Observable<Blob> {
		return this.http.get('api/prescription/downloadReport/' + examinationId, {
			responseType: 'blob'
		});
	} 

	deletePrescription(id: number): Observable<boolean> {
		return this.http.delete<boolean>('api/prescriptions/delete/' + id);
	}
}