import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Patient, Gender, Doctor, Pharmacy } from '../_services/types';

@Injectable()
export class FakeBackenInterceptor implements HttpInterceptor{

    constructor(){}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const { url, method, headers, body, params } = request;
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/auth/login') && method === 'POST': {
                    let content = JSON.parse(body)
                    switch(content.userName){
                        case 'valid' : return ok({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.mnh70acuKGZnYKF9NvNM9POryP4FD62p9FbSXC63MtA'});
                        case 'admin' : return ok({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMjM0NDMyMTAiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiTWlsYW4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.GxQYLEr0DpUQgt0f1gzEWPIuM_ccdyE4c2L3XVCCNC4'});
                        case 'error' : return error();
                        default:
                            return unauthorized();
                    }
                }
                case url.includes('/patients/free/') && method === 'GET': {
                    let path = url.split('/');
                    let name = path[path.length - 1]
                    switch(name){
                        case 'included' : return ok(false);
                        case 'error' : return error();
                        default:
                            return ok(true)
                    }
                }
                case url.endsWith('/patients/create') && method === 'PUT': {
                    switch(params.get('userName')){
                        case 'error' : return error();
                        default:
                            return ok(true);
                    }
                }
                case url.endsWith('/patients/applicants') && method === 'GET': {
                    let patients: Patient[] = [];
                    patients.push( {
                        id: 0, nativeName: 'Geza Alfoldi', userName: 'geza',
                        email: 'geza@gmail.com', gender: Gender.Male, birthday: new Date(),
                        weight: 84, address: 'Hungary, Budapest VII', hasMedicalData: true
                    } as Patient);
                    patients.push( {
                        id: 1, nativeName: 'Anna Alfoldi', userName: 'anna',
                        email: 'anna@gmail.com', gender: Gender.Female, birthday: new Date(),
                        weight: 60, address: 'Hungary, Sopron', hasMedicalData: false
                    } as Patient);
                    return ok(patients);
                }
                case url.endsWith('/patients') && method === 'GET': {
                    let patients: Patient[] = [];
                    patients.push( {
                        id: 0, nativeName: 'Geza Alfoldi', userName: 'geza',
                        email: 'geza@gmail.com', gender: Gender.Male, birthday: new Date(),
                        weight: 84, address: 'Hungary, Budapest VII', hasMedicalData: true
                    } as Patient);
                    patients.push( {
                        id: 1, nativeName: 'Anna Alfoldi', userName: 'anna',
                        email: 'anna@gmail.com', gender: Gender.Female, birthday: new Date(),
                        weight: 60, address: 'Hungary, Sopron', hasMedicalData: false
                    } as Patient);
                    return ok(patients);
                }
                case url.includes('/patients/accept-patient') && method === 'GET': {
                    return ok();
                }
                case url.includes('/patients/deny-patient') && method === 'DELETE': {
                    return error();
                }
                case url.includes('/patients/delete') && method === 'DELETE': {
                    return error();
                }
                case url.endsWith('/doctors') && method === 'GET': {
                    let doctors: Doctor[] = [];
                    doctors.push( {
                        id: 0, nativeName: 'Dr. Geza Alfoldi', userName: 'geza',
                        email: 'geza@gmail.com', gender: Gender.Male, birthday: new Date(),
                        startOfPractice: new Date(), specializations: []
                    } as Doctor);
                    doctors.push( {
                        id: 1, nativeName: 'Dr. Anna Alfoldi', userName: 'anna',
                        email: 'anna@gmail.com', gender: Gender.Female, birthday: new Date(),
                        startOfPractice: new Date(), specializations: []
                    } as Doctor);
                    return ok(doctors);
                }
                case url.includes('/doctors/delete') && method === 'DELETE': {
                    return error();
                }
                case url.endsWith('/pharmacies') && method === 'GET': {
                    let pharmacies: Pharmacy[] = [];
                    pharmacies.push( {
                        id: 0, name: 'Virag gyogyszertar', userName: 'viraggy',
                        email: 'info@viraggyogyszertar.com', supportDelivery: true,
                        supportPreOrder: false
                    } as Pharmacy);
                    pharmacies.push( {
                        id: 1, name: 'Beres gyogyszertar', userName: 'beresgy',
                        email: 'info@beresgyogyszertar.com', supportDelivery: false,
                        supportPreOrder: true
                    } as Pharmacy);
                    return ok(pharmacies);
                }
                case url.includes('/pharmacies/delete') && method === 'DELETE': {
                    return error();
                }
                default: return next.handle(request);
            }
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error() {
            return throwError({ status: 500, error: { message: 'Something is happened, this is sad.' } });
        }
	}
}