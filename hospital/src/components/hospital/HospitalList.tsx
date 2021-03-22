import React, { Fragment, useContext, useEffect } from 'react';
import HospitalContext from '../../context/hospital/hospitalContext';

const HospitalList = (props: any) => {
    const { name, handleChange } = props;
    const hospitalContext = useContext(HospitalContext);

    const { hospitals, getHospitals, loading } = hospitalContext;

    useEffect(() => {
        getHospitals();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            {hospitals !== null && !loading ? (
                <select name={name} onChange={handleChange} defaultValue='' >
                    <option disabled selected>Select an hospital</option>
                    {hospitals.map((hospital) => (
                        <option value={hospital._id} key={hospital._id} > { hospital.name} </option>
                    ))}
                </select>
            ) : (
                <select name={name} onChange={handleChange} defaultValue='' >
                    <option disabled selected>Please first add an hospital</option>
                </select>
            )}
        </Fragment>
    );
}

export default HospitalList;