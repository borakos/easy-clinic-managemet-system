import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './app-login/app-login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TokenInterceptor } from './_interceptors/token-interceptor';
import { FormsModule } from '@angular/forms';
import { FakeBackenInterceptor } from './_interceptors/fake-backend-interceptor';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { EditPatientsComponent } from './edit-patients/edit-patients.component';
import { PatientsRegistrationRequestComponent } from './patients-registration-request/patients-registration-request.component';
import { PatientsComponent } from './patients/patients.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PharmaciestComponent } from './pharmaciest/pharmaciest.component';
import { EditDoctorsComponent } from './edit-doctors/edit-doctors.component';
import { EditPharmaciesComponent } from './edit-pharmacies/edit-pharmacies.component';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MilitaryDateFormatter } from './_providers/military-date-provider';
import { ApplyToAppointmentComponent } from './apply-to-appointment/apply-to-appointment.component';
import { FormatDoctors } from './_providers/doctor-select-pipe';
import { FormatAppointmentEvents } from './_providers/appointment-event-pipe';
import { ManageAppointmentComponent } from './manage-appointment/manage-appointment.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavComponent,
        PatientRegistrationComponent,
        EditPatientsComponent,
        PatientsRegistrationRequestComponent,
        PatientsComponent,
        DoctorsComponent,
        PharmaciestComponent,
        EditDoctorsComponent,
        EditPharmaciesComponent,
        CustomCalendarComponent,
        ApplyToAppointmentComponent,
        FormatDoctors,
        FormatAppointmentEvents,
        ManageAppointmentComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        NgbModalModule,
        NgbModule,
        FontAwesomeModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        JwtModule.forRoot({
            config:{
                throwNoTokenError: false,
                tokenGetter: () => {
                    return localStorage.getItem('jwt');
                },
                authScheme: 'Bearer ',
                allowedDomains: ["localhost:44396"]
            }
        })
    ],
    providers: [
        JwtHelperService,
        HttpClient,
        {
            provide: CalendarDateFormatter,
            useClass: MilitaryDateFormatter
        },
        {	
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(library: FaIconLibrary){
        library.addIconPacks(fas, far);
    }
}