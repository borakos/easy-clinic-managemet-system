import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pharmacy } from '../_providers/types';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PharmacyService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	createPharmacy(data): Observable<boolean> {
		delete data.repassword;
		return this.http.put<boolean>('/api/pharmacies/create', null, {params : data});
	}

	nameIsFree(userName):Observable<boolean>{
		return this.http.get<boolean>('api/pharmacies/free/' + userName,{
			headers: this.headerJson
		});
	}

	listPharmacies(loadingError: (any) => Observable<any>): Observable<Pharmacy[]> {
		return this.http.get<Pharmacy[]>('api/pharmacies',{
			headers: this.headerJson
		}).pipe(catchError(loadingError));
	}

	deletePharmacy(id: number): Observable<boolean> {
		return this.http.delete<boolean>('/api/pharmacies/delete/' + id);
	}

	getPharmacy(id: number): Observable<Pharmacy> {
		return this.http.get<Pharmacy>('/api/pharmacies/' + id);
	}
}