import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../_providers/types';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PatientService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	createPatient(data, file = null): Observable<boolean> {
		delete data.repassword;
		return this.http.put<boolean>('/api/patients/create', file, {params : data});
	}

	nameIsFree(userName):Observable<boolean>{
		return this.http.get<boolean>('api/patients/free',{
			headers: this.headerJson,
			params: {username: userName}
		});
	}

	listApplicants(loadingError: (any) => Observable<any>): Observable<Patient[]> {
		return this.http.get<Patient[]>('api/patients/applicants',{
			headers: this.headerJson
		}).pipe(catchError(loadingError));
	}

	acceptPatientRegistration(id: number): Observable<boolean> {
		return this.http.get<boolean>('/api/patients/accept-patient/' + id);
	}

	denyPatientRegistration(id: number): Observable<boolean> {
		return this.http.delete<boolean>('/api/patients/deny-patient/' + id);
	}

	listPatients(loadingError: (any) => Observable<any>): Observable<Patient[]> {
		return this.http.get<Patient[]>('api/patients',{
			headers: this.headerJson
		}).pipe(catchError(loadingError));
	}

	deletePatient(id: number): Observable<boolean> {
		return this.http.delete<boolean>('/api/patients/delete/' + id);
	}

	getPatient(id: number): Observable<Patient> {
		return this.http.get<Patient>('/api/patients/' + id);
	}
}