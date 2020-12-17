import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prescription } from '../_providers/types';
import { Logger } from '../_services/logger-service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrescriptionService } from '../_services/prescription-service';
import { Pharmacy } from '../_providers/types';
import { PharmacyService } from '../_services/pharmacy-service';

@Component({
	selector: 'app-order-patient',
	templateUrl: './order-patient.component.html',
	styleUrls: ['./order-patient.component.scss']
})
export class OrderPatientComponent implements OnInit {

	@ViewChild('orderPrescription', { static: true }) orderPrescription: TemplateRef<any>;
    @ViewChild('orderSuccess', { static: true }) orderSuccess: TemplateRef<any>;
    @ViewChild('orderFailure', { static: true }) orderFailure: TemplateRef<any>;
	prescriptionObservable: Observable<Prescription[]>
    selectedPrescription: Prescription;
	storedDescription: string;
	pharmacyObservable: Observable<Pharmacy[]>;
	selectedPharmacy: Pharmacy;
	selectedLoading: string = 'notLoading';
	onlinePay: boolean;
	delivery: boolean;
    error = undefined;

    constructor(private prescriptionService: PrescriptionService, private pharmacyService: PharmacyService, private logger: Logger, private route: ActivatedRoute,  private modal: NgbModal) { }

    ngOnInit(): void {
        this.updatePrescriptions();
        this.error = undefined;
    }

	orederPrescriptionMenu(prescription: Prescription): void {
		this.selectedPrescription = prescription;
		this.storedDescription = prescription.notes;
		this.pharmacyObservable = this.pharmacyService.listPharmaciesWithFilter(this.errorHandler('List pharmacies with filter'), '');
		this.selectedLoading = 'notLoading';
		this.modal.open(this.orderPrescription, { size: 'lg'}).closed
		.subscribe((result) => {
			if (result) {
				console.log(result);
				this.onlinePay = result.onlinePay;
				this.delivery = result.delivery;
				this.modal.open(this.orderSuccess);
			}
		}, err => {
			this.error = this.logger.errorLogWithReturnText('Edit event', err);
		});
	}

	filterPharmacies(filter: string): void {
        this.pharmacyObservable = this.pharmacyService.listPharmaciesWithFilter(this.errorHandler('List pharmacies with filter'), filter);
    }

	getPharmacy(pharmacyId: number){
		this.selectedLoading = 'loading';
		this.pharmacyService.getPharmacy(pharmacyId)
		.subscribe((result) => {
			this.selectedPharmacy = result;
            this.selectedLoading = 'loaded';
        }, err => {
            this.error = this.logger.errorLogWithReturnText('Download exmaination', err);
        });
	}

	updatePrescriptions(): void {
		this.prescriptionObservable = this.prescriptionService.loadPrescriptionsByPatients(this.route.snapshot.params['id'], this.errorHandler('Loading Examinations'));
        this.error = undefined;
	}

    deletePresciption(id: number): void {
        this.prescriptionService.deletePrescription(id)
        .subscribe(response => {}
            , err => {
                this.error = this.logger.errorLogWithReturnText('Delete prescription', err);
        });
        this.error = undefined;
	}
	
	fileIsSelected(files): boolean {
        if (files.length > 0) {
            return true;
        } else {
            return false;
        }
	}
	
	errorHandler(errorTag: string): (any) => Observable<any> {
        return (err) => {
            this.error = this.logger.errorLogWithReturnText(errorTag, err);
            return of();
        }
    }

	downloadMedicalReport(): void {
        this.prescriptionService.downloadMedicalReportForPrescription(this.selectedPrescription?.id)
        .subscribe((result) => {
            if (result) {
                let file = new Blob([result], { type: "application/zip" });
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(file);
                } else {
                    const a: any = document.createElement('a');
                    document.body.appendChild(a);
                    a.style = 'display: none';    
                    const url = window.URL.createObjectURL(file);
                    a.href = url;
                    a.download = 'MedicalReport.zip';
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            }
        }, err => {
            this.error = this.logger.errorLogWithReturnText('Download exmaination', err);
        });
    }
}
