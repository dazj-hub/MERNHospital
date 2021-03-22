import React, { useContext, useEffect, useState } from 'react';
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from '../../models/hospitals/hospital.model';

const HospitalBox = (props: any) => {
    const { hospitalId, clicked } = props;

    const hospitalContext = useContext(HospitalContext);

    const { hospitals } = hospitalContext;

    const [hospital, setHospital] = useState({
        name: '',
        location: '',
        type: '',
        webSite: '',
    } as Hospital);

    useEffect(() => {
        if (hospitals !== null) {
            setHospital(hospitals.filter((hospital: Hospital) => hospital !== null && hospital._id === hospitalId)[0]);
        } else {
            setHospital({
                name: '',
                location: '',
                type: '',
                webSite: '',
            } as Hospital);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='div-box'>
            {hospital.name}{' '}<i className="fa fa-times-circle" aria-hidden="true" onClick={clicked}></i>
        </div>
    );
}

export default HospitalBox;