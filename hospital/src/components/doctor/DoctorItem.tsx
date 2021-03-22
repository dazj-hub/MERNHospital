import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DoctorContext from '../../context/doctor/doctorContext';
import { Doctor } from '../../models/doctors/doctor.model';

interface DoctorItemProps {
    doctor: Doctor;
}

const DoctorItem = (props: DoctorItemProps) => {
    const { doctor } = props;
    const doctorContext = useContext(DoctorContext);
    const { deleteDoctor, setCurrent, clearCurrent } = doctorContext;
    const { _id, firstName, lastName, email, speciality, myHospitals } = doctor;

    const onDelete = () => {
        deleteDoctor(_id);
        clearCurrent();
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                <i className='fas fa-user-md'></i> {' '}{firstName}{' '}{lastName}
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        {' '}
                        <i className='fas fa-envelope-open'></i> {' '}{email}
                    </li>
                )}
                {speciality && (
                    <li>
                        {' '}
                        <i className='fas fa-stethoscope'></i> {' '}{speciality}
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => setCurrent(doctor)}>
                    Edit
        </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
        </button>
            </p>
        </div>
    );
};

DoctorItem.protoTypes = {
    doctor: PropTypes.object.isRequired,
};

export default DoctorItem;
