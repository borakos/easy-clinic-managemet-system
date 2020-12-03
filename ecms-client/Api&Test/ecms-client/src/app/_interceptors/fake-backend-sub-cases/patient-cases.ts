import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ok, error } from './responses';
import { Patient, Gender } from '../../_providers/types';

export function handlePatientRequests(request: HttpRequest<any>): Observable<HttpEvent<any>> | undefined {
    const { url, method, headers, body, params } = request;
    switch(true){
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
                weight: 84, country: 'Hungary', city: 'Budapest VII', postalCode: 8007,
                address: 'Kossuth u. 1.', hasMedicalData: true
            } as Patient);
            patients.push( {
                id: 1, nativeName: 'Anna Alfoldi', userName: 'anna',
                email: 'anna@gmail.com', gender: Gender.Female, birthday: new Date(),
                weight: 60, country: 'Hungary', city: 'Sopron', postalCode: 9420,
                address: 'Kossuth u. 1.', hasMedicalData: false
            } as Patient);
            return ok(patients);
        }
        case url.endsWith('/patients') && method === 'GET': {
            let patients: Patient[] = [];
            patients.push( {
                id: 0, nativeName: 'Geza Alfoldi', userName: 'geza',
                email: 'geza@gmail.com', gender: Gender.Male, birthday: new Date(),
                weight: 84, country: 'Hungary', city: 'Budapest VII', postalCode: 8007,
                address: 'Kossuth u. 1.', hasMedicalData: true
            } as Patient);
            patients.push( {
                id: 1, nativeName: 'Anna Alfoldi', userName: 'anna',
                email: 'anna@gmail.com', gender: Gender.Female, birthday: new Date(),
                weight: 60, country: 'Hungary', city: 'Sopron', postalCode: 9420,
                address: 'Kossuth u. 1.', hasMedicalData: false
            } as Patient);
            return ok(patients);
        }
        case url.includes('/patients/') && method === 'GET': {
            return ok({
                id: 0, nativeName: 'Geza Alfoldi', userName: 'geza',
                email: 'geza@gmail.com', gender: Gender.Male, birthday: new Date(),
                weight: 84, country: 'Hungary', city: 'Budapest VII', postalCode: 8007,
                address: 'Kossuth u. 1.', hasMedicalData: true
            } as Patient);
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
        default: return undefined;
    }
}