import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, AppointmentEvent, Examination, Prescription } from 'src/app/_providers/types';
import { ok, error } from './responses';

export function handlePrescriptionRequests(request: HttpRequest<any>): Observable<HttpEvent<any>> | undefined {
    const { url, method, headers, body, params } = request;
    switch(true){
        case url.includes('/examinations/list-by-doctor') && method === 'POST': {
            let doctorIds: number = body.doctorId;
            if(doctorIds){
				let hour: number = 3600 * 1000;
				return ok([
					{
						id: 1,
						application:{
							id: 1,
							event: {
								id: 3,
								label: 'Dr. Géza Alföldi',
								isFree: false,
								isAccepted: false,
								start: new Date(Date.now()+ 23 * 3600 * 1000),
								end: new Date(Date.now() + 23.5 * 3600 * 1000),
							} as AppointmentEvent,
							containsFile: true,
							description: 'hello description',
							preferOnline: true
						} as Appointment,
						notes: '',
						containsFile: false
					} as Examination,
					{
						id: 2,
						application:{
							id: 1,
							event: {
								id: 3,
								label: 'Dr. Anna Alföldi',
								isFree: false,
								isAccepted: true,
								start: new Date(Date.now()+ 23 * 3600 * 1000),
								end: new Date(Date.now() + 23.5 * 3600 * 1000),
							} as AppointmentEvent,
							containsFile: true,
							description: 'hello description',
							preferOnline: false
						} as Appointment,
						notes: '',
						containsFile: true
					} as Examination
				])
            } else {
                return ok([]);
            }
		}
		case url.endsWith('api/examinations/prescriptions') && method === 'PUT': {
            return ok(true);
        }
        case url.endsWith('/prescriptions/list-by-patient') && method === 'POST': {
            let doctorIds: number = body.patientId;
            if(doctorIds){
				let hour: number = 3600 * 1000;
				return ok([
					{
						id: 1,
						examination:
						{
							id: 1,
							application:{
								id: 1,
								event: {
									id: 3,
									label: 'Dr. Géza Alföldi',
									isFree: false,
									isAccepted: false,
									start: new Date(Date.now()+ 23 * 3600 * 1000),
									end: new Date(Date.now() + 23.5 * 3600 * 1000),
								} as AppointmentEvent,
								containsFile: true,
								description: 'hello description',
								preferOnline: true
							} as Appointment,
							notes: '',
							containsFile: false
						} as Examination,
						containsFile: true,
						notes: 'Notes1'
					} as Prescription,
					{
						id: 2,
						examination: {
							id: 2,
							application:{
								id: 1,
								event: {
									id: 3,
									label: 'Dr. Anna Alföldi',
									isFree: false,
									isAccepted: true,
									start: new Date(Date.now()+ 23 * 3600 * 1000),
									end: new Date(Date.now() + 23.5 * 3600 * 1000),
								} as AppointmentEvent,
								containsFile: true,
								description: 'hello description',
								preferOnline: false
							} as Appointment,
							notes: '',
							containsFile: true
						} as Examination,
						containsFile: false,
						notes: 'Notes2'
					} as Prescription
				])
            } else {
                return ok([]);
            }
		}
		case url.includes('/examinations/downloadReport') && method === 'GET': {
            let file = new Blob([], {
                type: 'application/zip'
            })
            return ok(file);
        }
        case url.includes('/examinations/delete') && method === 'DELETE': {
            return ok(true);
        }
        case url.endsWith('/examinations/edit') && method === 'PUT': {
            let desc = params.get('description');
            if(desc?.includes('error')){
                return error();
            } else if(desc?.includes('occupied')){
                return ok(false);
            }
            return ok(true);
		}
        default: return undefined;
    }
}