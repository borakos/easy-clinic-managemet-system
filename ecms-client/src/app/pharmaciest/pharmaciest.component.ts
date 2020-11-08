import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PharmacyService } from '../_services/pharmacy-service';
import { Pharmacy } from '../_services/types';

@Component({
    selector: 'app-pharmaciest',
    templateUrl: './pharmaciest.component.html',
    styleUrls: ['./pharmaciest.component.scss']
})
export class PharmaciestComponent implements OnInit {

    pharmaciesObservable: Observable<Pharmacy[]>
    error = undefined;

    constructor(private pharmacyService: PharmacyService) { }

    ngOnInit(): void {
        this.pharmaciesObservable = this.pharmacyService.listPharmacies(
            (err) => {
                console.error('Loading pharmacies', err);
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                return of();
            }
        );
        this.error = undefined;
    }

    deletePharmacy(id: number): void {
        this.pharmacyService.deletePharmacy(id)
        .subscribe(response => {}
            , err => {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
                console.error('Delete pharmacy', err);
        });
        this.error = undefined;
    }

}
