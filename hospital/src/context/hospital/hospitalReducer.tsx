import { Hospital, Hospitals_State } from '../../models/hospitals/hospital.model';
import {
  GET_HOSPITALS,
  GET_HOSPITAL,
  ADD_HOSPITAL,
  DELETE_HOSPITAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_HOSPITAL,
  FILTER_HOSPITALS,
  CLEAR_HOSPITALS,
  CLEAR_FILTER,
  HOSPITAL_ERROR,
} from '../types';

const hospitalReducer = (state: Hospitals_State, action: any) => {
  switch (action.type) {
    case GET_HOSPITALS:
      return {
        ...state,
        hospitals: action.payload.data,
        loading: false,
      };      
    case GET_HOSPITAL:
      return {
        ...state,
        // hospitalsByDoctor: state.hospitalsByDoctor === null ? [action.payload.data] : [action.payload.data, ...state.hospitalsByDoctor],
        loading: false,
      };
    case ADD_HOSPITAL:
      return {
        ...state,
        hospitals: [action.payload.data, ...state.hospitals],
        loading: false,
      };
    case UPDATE_HOSPITAL:
      return {
        ...state,
        hospitals: state.hospitals.map((hospital: Hospital) =>
        hospital._id === action.payload.data._id ? action.payload.data : hospital
        ),
        loading: false,
      };
    case DELETE_HOSPITAL:
      return {
        ...state,
        hospitals: state.hospitals.filter((hospital: Hospital) => hospital._id !== action.payload),
        loading: false,
      };
    case CLEAR_HOSPITALS:
      return {
        ...state,
        hospitals: null,
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
    case FILTER_HOSPITALS:
      return {
        ...state,
        filtered: state.hospitals.filter((hospital: Hospital) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return hospital.name.match(regex) || hospital.location.match(regex) || hospital.type.match(regex);
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };
    case HOSPITAL_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default hospitalReducer;
