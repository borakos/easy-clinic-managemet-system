import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ok, error } from './responses';
import { Pharmacy } from '../../_services/types';

export function handlePharmacyRequests(request: HttpRequest<any>): Observable<HttpEvent<any>> | undefined {
    const { url, method, headers, body, params } = request;
    switch(true){
        case url.endsWith('/pharmacies') && method === 'GET': {
            let pharmacies: Pharmacy[] = [];
            pharmacies.push( {
                id: 0, name: 'Virag gyogyszertar', userName: 'viraggy',
                email: 'info@viraggyogyszertar.com', supportDelivery: true,
                supportPreOrder: false, country: 'Hungary', city: 'Budapest VII',
                postalCode: 8007, address:'Kossuth u. 1.'
            } as Pharmacy);
            pharmacies.push( {
                id: 1, name: 'Beres gyogyszertar', userName: 'beresgy',
                email: 'info@beresgyogyszertar.com', supportDelivery: false,
                supportPreOrder: true, country: 'Hungary', city: 'Sopron',
                postalCode: 9420, address:'Kossuth u. 1.'
            } as Pharmacy);
            return ok(pharmacies);
        }
        case url.includes('/pharmacies/delete') && method === 'DELETE': {
            return error();
        }
        case url.includes('/pharmacies/') && method === 'GET': {
            return ok({
                id: 0, name: 'Virag gyogyszertar', userName: 'error',
                email: 'info@viraggyogyszertar.com', supportDelivery: true,
                supportPreOrder: false, country: 'Hungary', city: 'Budapest VII',
                postalCode: 8007, address:'Kossuth u. 1.'
            } as Pharmacy);
        }
        case url.endsWith('/pharmacies/create') && method === 'PUT': {
            switch(params.get('userName')){
                case 'error' : return error();
                default:
                    return ok(true);
            }
        }
        default: return undefined;
    }
}