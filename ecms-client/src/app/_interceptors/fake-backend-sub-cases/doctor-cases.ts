import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ok, error } from './responses';
import { Doctor, Gender } from '../../_services/types';

export function handleDoctorRequests(request: HttpRequest<any>): Observable<HttpEvent<any>> | undefined {
    const { url, method, headers, body, params } = request;
    switch(true){
        case url.includes('/doctors/') && method === 'GET': {
            return ok({
                id: 0, nativeName: 'Dr Geza Alfoldi', userName: 'geza',
                email: 'geza@gmail.com', gender: Gender.Male, birthday: new Date(),
                startOfPractice: new Date()
            } as Doctor);
        }
        case url.endsWith('/doctors/create') && method === 'PUT': {
            switch(params.get('userName')){
                case 'error' : return error();
                default:
                    return ok(true);
            }
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
        default: return undefined;
    }
}