import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { handleAppointmentRequests } from './fake-backend-sub-cases/appointment-cases';
import { handleDoctorRequests } from './fake-backend-sub-cases/doctor-cases';
import { handlePatientRequests } from './fake-backend-sub-cases/patient-cases';
import { handlePharmacyRequests } from './fake-backend-sub-cases/pharmacy-cases';
import { ok, error, unauthorized } from './fake-backend-sub-cases/responses';
import { handleExaminationRequests } from './fake-backend-sub-cases/examination-cases';

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
            /*switch (true) {
                case url.endsWith('/auth/login') && method === 'POST': return next.handle(request);
                case url.includes('/patients/free/') && method === 'GET': return next.handle(request);
                case url.endsWith('/patients/create') && method === 'PUT': return next.handle(request);
            }/* */

            switch (true) {
                case url.endsWith('/auth/login') && method === 'POST': {
                    let content = JSON.parse(body)
                    switch(content.userName){
                        case 'patient' : return ok('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoicGF0aWVudCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.Vn0Tqs-coUcnDmRo0nRps2mEAB3dwoiS57dvClD-UD8');
                        case 'admin' : return ok('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMjM0NDMyMTAiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiTWlsYW4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.GxQYLEr0DpUQgt0f1gzEWPIuM_ccdyE4c2L3XVCCNC4');
                        case 'error' : return error();
                        default:
                            return unauthorized();
                    }
                }
            }
            let result: Observable<HttpEvent<any>> = handlePatientRequests(request);
            if(result){
                return result;
            }
            result = handleDoctorRequests(request);
            if(result){
                return result;
            }
            result = handlePharmacyRequests(request);
            if(result){
                return result;
            }
            result = handleAppointmentRequests(request);
            if(result){
                return result;
			}
			result = handleExaminationRequests(request);
            if(result){
                return result;
            }
            return next.handle(request);
        }
	}
}