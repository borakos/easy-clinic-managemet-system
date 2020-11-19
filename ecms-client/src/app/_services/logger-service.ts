import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Logger{

	errorLogWithReturnText(caption: string, error: any): string {
		console.error(caption, error);
		return this.getErrorText(error);
	};

	getErrorText(error: any): string {
		return 'Error ' + error.status + ': ' + (error.error.message ? error.error.message : error.statusText);
	}
}