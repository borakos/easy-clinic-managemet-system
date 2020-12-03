import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PharmacyService } from '../_services/pharmacy-service';
import { Pharmacy } from '../_providers/types';
import { Logger } from '../_services/logger-service';

@Component({
    selector: 'app-pharmaciest',
    templateUrl: './pharmaciest.component.html',
    styleUrls: ['./pharmaciest.component.scss']
})
export class PharmaciestComponent implements OnInit {

    pharmaciesObservable: Observable<Pharmacy[]>
    error = undefined;

    constructor(private logger: Logger, private pharmacyService: PharmacyService) { }

    ngOnInit(): void {
        this.pharmaciesObservable = this.pharmacyService.listPharmacies(
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading pharmacies', err);
                return of();
            }
        );
        this.error = undefined;
    }

    deletePharmacy(id: number): void {
        this.pharmacyService.deletePharmacy(id)
        .subscribe(response => {}
            , err => {
                this.error = this.logger.errorLogWithReturnText('Delete pharmacy', err);
        });
        this.error = undefined;
    }

}
