import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export function ok(body?): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body }));
}

export function unauthorized(): Observable<HttpEvent<any>> {
    return throwError({ status: 401, error: { message: 'Unauthorised' } });
}

export function error(): Observable<HttpEvent<any>> {
    return throwError({ status: 500, error: { message: 'Something is happened, this is sad.' } });
}