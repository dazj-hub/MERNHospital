import React, { PropsWithChildren, useReducer } from 'react';
import g_intance from '../../utils/generic_instance';
import DoctorContext from './doctorContext';
import doctorReducer from './doctorReducer';
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
import setAuthToken from '../../utils/setAuthToken';

const DoctorState = (props: PropsWithChildren<any>) => {
    const initialState: Doctors_State = {
        doctors: null,
        current: null,
        filtered: null,
        error: null,
        loading: false
    };

    const [state, dispatch] = useReducer(doctorReducer, initialState);

    // Get Doctors
    const getDoctors = async () => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.get('/v1/doctor');
            dispatch({ type: GET_DOCTORS, payload: res.data });
        } catch (err) {
            dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
        }
    };

    // Add Doctor
    const addDoctor = async (doctor: Doctor) => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.post('/v1/doctor', doctor);
            dispatch({ type: ADD_DOCTOR, payload: res.data });
        } catch (err) {
            dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
        }
    };
    // Delete Doctor
    const deleteDoctor = async (id: string) => {
        try {
            await g_intance.delete(`/v1/doctor/${id}`);
            dispatch({ type: DELETE_DOCTOR, payload: id });
        } catch (err) {
            dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
        }
    };
    // Clear Doctors
    const clearDoctors = () => {
        dispatch({ type: CLEAR_DOCTORS });
    };
    // Set Current Doctor
    const setCurrent = (doctor: Doctor) => {
        dispatch({ type: SET_CURRENT, payload: doctor });
    };
    // Clear Current Doctor
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // Update Doctor
    const updateDoctor = async (doctor: Doctor) => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.put(`/v1/doctor`, doctor, { params: { id: doctor._id } });
            dispatch({ type: UPDATE_DOCTOR, payload: res.data });
        } catch (err) {
            dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
        }
    };
    // Filter Doctors
    const filterDoctors = (text: string) => {
        dispatch({ type: FILTER_DOCTORS, payload: text });
    };
    // Clear Filters
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <DoctorContext.Provider
            value={{
                doctors: state.doctors,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                addDoctor,
                deleteDoctor,
                setCurrent,
                clearCurrent,
                updateDoctor,
                filterDoctors,
                clearFilter,
                getDoctors,
                clearDoctors,
            }}
        >
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorState;
