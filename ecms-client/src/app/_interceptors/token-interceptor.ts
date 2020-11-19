import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
	
	constructor(private jwtHelper: JwtHelperService){}

	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
		request=request.clone({
			setHeaders: {
				"Authorization": this.jwtHelper.getAuthScheme  + this.jwtHelper.tokenGetter(),
			},
			url: this.getUrl(request.url)
		});
		return next.handle(request);
	}

	private getUrl(url: string): string {
		if(url.startsWith('api')){
			url = (environment.production ? window.location.origin : environment.server) + '/' + url;
		}
		return url;
	}
}