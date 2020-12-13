import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Logger } from 'Api&Test/ecms-client/src/app/_services/logger-service';
import { Examination } from '../_providers/types';
import { ExaminationService } from '../_services/examination-service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-examination-doctor',
	templateUrl: './examination-doctor.component.html',
	styleUrls: ['./examination-doctor.component.scss']
})
export class ExaminationDoctorComponent implements OnInit {

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
		this.modal.open(this.editExamination, { size: 'lg'}).closed
		.subscribe((result) => {
			if (result) {
				this.saveEditExaminationData(this.selectedExamination.id as number, result);
			}
		}, err => {
			this.error = this.logger.errorLogWithReturnText('Edit event', err);
		});
	}

	saveEditExaminationData(examinationId: number, data): void {
        let editedAppointment;
		let files = data.files;
		let presciptionFiles = data.filesP;
		let presciptionNotes = data.descriptionP;
		delete data.filesP;
		delete data.descriptionP;
		delete data.files;
		data.eventId = examinationId;
		console.log(data)
        if (this.fileIsSelected(files)) {
            let template = <File>files[0];
            let formData = new FormData();
            let file = formData.append('file', template, template.name)
            editedAppointment = this.examinationService.editExamination(data, file);
        } else {
            editedAppointment = this.examinationService.editExamination(data);
        }
        editedAppointment.subscribe((response) => {
            if (response) {
				if (this.fileIsSelected(presciptionFiles)) {
					let template = <File>presciptionFiles[0];
					let formData = new FormData();
					let file = formData.append('file', template, template.name)
					data = {
						notes: presciptionNotes,
						examinationId: examinationId
					}
					this.examinationService.editExamination(data, file).subscribe((result) => {
                		this.modal.open(this.editSuccess);
                    }, err => {
                        this.error = this.logger.errorLogWithReturnText('Save prescription', err);
                    });
				} else {
					this.modal.open(this.editSuccess);
				}
            } else {
                this.modal.open(this.editFailure).closed
                    .subscribe((result) => {
                        if (result) {
                            this.storedDescription = data.description;
                        } else {
                            this.storedDescription = '';
                        }
                    }, err => {
                        this.error = this.logger.errorLogWithReturnText('Save description', err);
                    });
            }
            this.updateExaminations();
        }, err => {
            this.error = this.logger.errorLogWithReturnText('Edit appointment', err);
        });
	}

	updateExaminations(): void {
		this.examinationsObservable = this.examinationService.loadExaminationsByDoctors(this.route.snapshot.params['id'],
            (err) => {
                this.error = this.logger.errorLogWithReturnText('Loading Examinations', err);
                return of();
            }
        );
        this.error = undefined;
	}

    deleteExamination(id: number): void {
        this.examinationService.deleteExamination(id)
        .subscribe(response => {}
            , err => {
                this.error = this.logger.errorLogWithReturnText('Delete examination', err);
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
