import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DoctorService } from '../_services/doctor-service';
import { Doctor, Gender } from '../_providers/types';
import { Logger } from '../_services/logger-service';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

    doctorsObservable: Observable<Doctor[]>
    Gender = Gender;
    error = undefined;

    constructor(private doctorService: DoctorService, private logger: Logger) { }

    ngOnInit(): void {
        this.doctorsObservable = this.doctorService.listDoctors(
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading doctors', err);
                return of();
            }
        );
        this.error = undefined;
    }

    deleteDoctor(id: number): void {
        this.doctorService.deleteDoctor(id)
        .subscribe(response => {}
            , err => {
                this.error = this.logger.errorLogWithReturnText('Delete doctor', err);
        });
        this.error = undefined;
    }
}
