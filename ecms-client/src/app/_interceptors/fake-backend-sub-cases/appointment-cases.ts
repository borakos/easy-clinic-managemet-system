import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentEvent } from 'src/app/_providers/types';
import { ok, error } from './responses';

export function handleAppointmentRequests(request: HttpRequest<any>): Observable<HttpEvent<any>> | undefined {
    const { url, method, headers, body, params } = request;
    switch(true){
        case url.includes('/appointments/list-for-patient-select') && method === 'POST': {
            let doctorIds: number[] = body.doctorIds;
            if(doctorIds && (doctorIds.length > 0)){
                let hour: number = 3600 * 1000;
                return ok([
                    {
                        id: 0,
                        label: 'Dr. Anna Alöldi',
                        isFree: true,
                        start: new Date(Date.now()),
                        end: new Date(Date.now() + 0.5 * hour),
                    } as AppointmentEvent,
                    {
                        id: 1,
                        label: 'Dr. Géza Alöldi',
                        isFree: false,
                        start: new Date(Date.now() + 2 * hour),
                        end: new Date(Date.now() + 2.5 * hour),
                    } as AppointmentEvent,
                    {
                        id: 2,
                        label: 'Dr. Anna Alöldi',
                        isFree: false,
                        start: new Date(Date.now() + 22 * hour),
                        end: new Date(Date.now() + 22.5 * hour),
                    } as AppointmentEvent,
                    {
                        id: 3,
                        label: 'Dr. Géza Alöldi',
                        isFree: true,
                        start: new Date(Date.now()+ 23 * hour),
                        end: new Date(Date.now() + 23.5 * hour),
                    } as AppointmentEvent,
                ]);
            } else {
                return ok([]);
            }
        }
        case url.includes('/appointments/create') && method === 'PUT': {
            let desc = params.get('description');
            if(desc.includes('error')){
                return error();
            } else if(desc.includes('occupied')){
                return ok(false);
            }
            return ok(true);
        }
        default: return undefined;
    }
}