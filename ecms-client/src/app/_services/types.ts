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
    Male = 'male',
    Female = 'female'
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