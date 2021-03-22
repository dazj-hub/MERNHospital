export interface Doctor {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    speciality: string;
    myHospitals: []
}

export interface Doctors_State {
    doctors: Doctor[] | any;
    current: Doctor | any;
    filtered: Doctor[] | any;
    error: any;
    loading: Boolean;
}