import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ok, error } from './responses';
import { Pharmacy } from '../../_providers/types';

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
		case url.endsWith('/pharmacies/list/filter') && method === 'POST': {
			let pharmacies: Pharmacy[] = [
                {
					id: 0, name: 'Virag gyogyszertar', userName: 'viraggy',
					email: 'info@viraggyogyszertar.com', supportDelivery: true,
					supportPreOrder: false, country: 'Hungary', city: 'Budapest VII',
					postalCode: 8007, address:'Kossuth u. 1.'
				} as Pharmacy,
				{
					id: 1, name: 'Beres gyogyszertar', userName: 'beresgy',
					email: 'info@beresgyogyszertar.com', supportDelivery: false,
					supportPreOrder: true, country: 'Hungary', city: 'Sopron',
					postalCode: 9420, address:'Kossuth u. 1.'
				} as Pharmacy
            ];
            let filter: string  = body.filter as string;
            if(filter) {
                let filtered = [];
                for(let i = 0; i < pharmacies.length; i++){
                    if((pharmacies[i].name.includes(filter)) || (pharmacies[i].city[0].includes(filter))){
                        filtered.push(pharmacies[i])
                    }
                }
                return ok(filtered);
            }
            return ok(pharmacies);
        }
        case url.includes('/pharmacies/delete') && method === 'DELETE': {
            return error();
        }
        case url.includes('/pharmacies/') && method === 'GET': {
            return ok({
                id: 0, name: 'Virag gyogyszertar', userName: 'error',
                email: 'info@viraggyogyszertar.com', supportDelivery: true,
                supportPreOrder: true, country: 'Hungary', city: 'Budapest VII',
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