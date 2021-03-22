import React, { PropsWithChildren, useReducer } from 'react';
import g_intance from '../../utils/generic_instance';
import HospitalContext from './hospitalContext';
import hospitalReducer from './hospitalReducer';
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
import setAuthToken from '../../utils/setAuthToken';

const HospitalState = (props: PropsWithChildren<any>) => {
    const initialState: Hospitals_State = {
        hospitals: null,
        current: null,
        filtered: null,
        error: null,
        loading: false
    };

    const [state, dispatch] = useReducer(hospitalReducer, initialState);

    // Get Hospitals
    const getHospitals = async () => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.get('/v1/hospital');
            dispatch({ type: GET_HOSPITALS, payload: res.data });
        } catch (err) {
            dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
        }
    };

    // Get Hospital
    const getHospital = async (id: string) => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.get(`/v1/hospital/${id}`);
            dispatch({ type: GET_HOSPITAL, payload: res.data });
        } catch (err) {
            dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
        }
    };

    // Add Hospital
    const addHospital = async (hospital: Hospital) => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.post('/v1/hospital', hospital);
            dispatch({ type: ADD_HOSPITAL, payload: res.data });
        } catch (err) {
            dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
        }
    };
    // Delete Hospital
    const deleteHospital = async (id: string) => {
        try {
            await g_intance.delete(`/v1/hospital/${id}`);
            dispatch({ type: DELETE_HOSPITAL, payload: id });
        } catch (err) {
            console.log('[HospitalState.tsx] error ', JSON.stringify(err, null, 2));
            dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
        }
    };
    // Clear Hospital
    const clearHospitals = () => {
        dispatch({ type: CLEAR_HOSPITALS });
    };
    // Set Current Hospital
    const setCurrent = (hospital: Hospital) => {
        dispatch({ type: SET_CURRENT, payload: hospital });
    };
    // Clear Current Hospital
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // Update Hospital
    const updateHospital = async (hospital: Hospital) => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await g_intance.put(`/v1/hospital`, hospital, { params: { id: hospital._id } });
            dispatch({ type: UPDATE_HOSPITAL, payload: res.data });
        } catch (err) {
            dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
        }
    };
    // Filter Hospitals
    const filterHospitals = (text: string) => {
        dispatch({ type: FILTER_HOSPITALS, payload: text });
    };
    // Clear Filters
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <HospitalContext.Provider
            value={{
                hospitals: state.hospitals,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                addHospital,
                deleteHospital,
                setCurrent,
                clearCurrent,
                updateHospital,
                filterHospitals,
                clearFilter,
                getHospitals,
                getHospital,
                clearHospitals,
            }}
        >
            {props.children}
        </HospitalContext.Provider>
    );
};

export default HospitalState;
