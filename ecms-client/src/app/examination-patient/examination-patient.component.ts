import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Examination } from '../_providers/types';
import { ExaminationService } from '../_services/examination-service';
import { Logger } from '../_services/logger-service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-examination-patient',
	templateUrl: './examination-patient.component.html',
	styleUrls: ['./examination-patient.component.scss']
})
export class ExaminationPatientComponent implements OnInit {

	@ViewChild('editExamination', { static: true }) editExamination: TemplateRef<any>;
    @ViewChild('editSuccess', { static: true }) editSuccess: TemplateRef<any>;
    @ViewChild('editFailure', { static: true }) editFailure: TemplateRef<any>;
	examinationsObservable: Observable<Examination[]>
    selectedExamination: Examination;
	storedDescription: string;
    error = undefined;

    constructor(private examinationService: ExaminationService, private logger: Logger, private route: ActivatedRoute,  private modal: NgbModal) { }

    ngOnInit(): void {
        this.updateExaminations();
        this.error = undefined;
    }

	editExaminationData(examination: Examination): void {
		this.selectedExamination = examination;
		this.storedDescription = examination.notes;
		this.modal.open(this.editExamination, { size: 'lg'});
	}

	updateExaminations(): void {
		this.examinationsObservable = this.examinationService.loadExaminationsByPatients(this.route.snapshot.params['id'],
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading Examinations', err);
                return of();
            }
        );
        this.error = undefined;
	}

	downloadMedicalReport(): void {
        this.examinationService.downloadMedicalReportForExamination(this.selectedExamination?.id)
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
