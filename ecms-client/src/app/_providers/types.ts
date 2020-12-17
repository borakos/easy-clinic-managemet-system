export interface User {
    id: number,
    role: UserRole,
    name: string,
    iat: number
}

export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Patient = 'patient',
    Doctor = 'doctor',
    Pharmacy = 'pharmacy'
}

export interface Patient {
    id: number,
    nativeName: string,
    userName: string,
    email: string,
    gender: Gender,
    birthday: Date,
    weight: number,
    country: string,
    city: string,
    postalCode: number,
    address: string,
    hasMedicalData: boolean
}

export enum Gender {
    Male = 0,
    Female = 1
}

export interface Doctor {
    id: number,
    nativeName: string,
    userName: string,
    email: string,
    gender: Gender,
    birthday: Date,
    startOfPractice: Date,
    specializations: string[]
}

export interface Pharmacy {
    id: number,
    name: string,
    userName: string,
    email: string,
    country: string,
    city: string,
    postalCode: number,
    address: string,
    supportDelivery: boolean,
    supportPreOrder: boolean
}

export interface AppointmentEvent {
    id: number,
    label: string,
    isFree: boolean,
    isAccepted: boolean,
    start: Date,
    end: Date
}

export interface Appointment {
    id: number,
    event: AppointmentEvent,
    description: string,
	containsFile: boolean,
	preferOnline: boolean
}

export interface FactoryTemplateEvents {
    [day: string] : {
        start: string,
        end: string
    }[]
}

export interface Examination {
	id: number,
	application: Appointment,
	notes: string,
	containsFile: boolean
}

export interface Prescription {
	id: number,
	examination: Examination,
	notes: string,
	containsFile: boolean
}