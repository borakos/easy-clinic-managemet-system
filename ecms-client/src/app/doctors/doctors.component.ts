import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DoctorService } from '../_services/doctor-service';
import { Doctor, Gender } from '../_services/types';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

    doctorsObservable: Observable<Doctor[]>
    Gender = Gender;
    error = undefined;

    constructor(private doctorService: DoctorService) { }

    ngOnInit(): void {
        this.doctorsObservable = this.doctorService.listDoctors(
            (err) => {
                console.error('Loading doctors', err);
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                return of();
            }
        );
        this.error = undefined;
    }

    deleteDoctor(id: number): void {
        this.doctorService.deleteDoctor(id)
        .subscribe(response => {}
            , err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Delete doctor', err);
        });
        this.error = undefined;
    }
}
