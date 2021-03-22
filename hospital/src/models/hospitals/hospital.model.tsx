export interface Hospital {
    _id: string;
    name: string;
    location: string;
    type: string;
    webSite: string;
}

export interface Hospitals_State {
    hospitals: Hospital[] | any;
    current: Hospital | any;
    filtered: Hospital[] | any;
    error: any;
    loading: Boolean;
}