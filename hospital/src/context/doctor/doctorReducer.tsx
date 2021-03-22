import { Doctor, Doctors_State } from '../../models/doctors/doctor.model';
import {
  GET_DOCTORS,
  ADD_DOCTOR,
  DELETE_DOCTOR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DOCTOR,
  FILTER_DOCTORS,
  CLEAR_DOCTORS,
  CLEAR_FILTER,
  DOCTOR_ERROR,
} from '../types';

const doctorReducer = (state: Doctors_State, action: any) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload.data,
        loading: false,
      };
    case ADD_DOCTOR:
      return {
        ...state,
        doctors: [action.payload.data, ...state.doctors],
        loading: false,
      };
    case UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map((doctor: Doctor) =>
        doctor._id === action.payload.data._id ? action.payload.data : doctor
        ),
        loading: false,
      };
    case DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter((doctor: Doctor) => doctor._id !== action.payload),
        loading: false,
      };
    case CLEAR_DOCTORS:
      return {
        ...state,
        doctors: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };
    case FILTER_DOCTORS:
      return {
        ...state,
        filtered: state.doctors.filter((doctor: Doctor) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return doctor.firstName.match(regex) || doctor.lastName.match(regex) || doctor.email.match(regex) || doctor.speciality.match(regex);
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };
    case DOCTOR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default doctorReducer;
