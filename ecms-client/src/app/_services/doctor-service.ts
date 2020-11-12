import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from '../_providers/types';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DoctorService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	createDoctor(data): Observable<boolean> {
		delete data.repassword;
		return this.http.put<boolean>('/api/doctors/create', null, {params : data});
	}

	nameIsFree(userName):Observable<boolean>{
		return this.http.get<boolean>('api/doctors/free/' + userName,{
			headers: this.headerJson
		});
	}

	listDoctors(loadingError: (any) => Observable<any>): Observable<Doctor[]> {
		return this.http.get<Doctor[]>('api/doctors',{
			headers: this.headerJson
		}).pipe(catchError(loadingError));
	}

	listDoctorsWithFilter(loadingError: (any) => Observable<any>, filter: string = ''): Observable<Doctor[]> {
		return this.http.post<Doctor[]>('api/doctors/list/filter', {filter: filter},{
			headers: this.headerJson
		}).pipe(catchError(loadingError));
	}

	deleteDoctor(id: number): Observable<boolean> {
		return this.http.delete<boolean>('/api/doctors/delete/' + id);
	}

	getDoctor(id: number): Observable<Doctor> {
		return this.http.get<Doctor>('/api/doctors/' + id);
	}
}