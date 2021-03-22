import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import AlertContext from '../../context/alert/alertContext';
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from '../../models/hospitals/hospital.model';

interface HospitalItemProps {
    hospital: Hospital;
}

const HospitalItem = (props: HospitalItemProps) => {
    const { hospital } = props;
    const hospitalContext = useContext(HospitalContext);
    const { deleteHospital, setCurrent, clearCurrent } = hospitalContext;
    const { _id, name, location, type, webSite } = hospital;

    // const alertContext = useContext(AlertContext);
    // const { setAlert } = alertContext;

    const onDelete = () => {
        deleteHospital(_id);
        clearCurrent();
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                <i className='fas fa-heartbeat'></i> {' '}{name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={'badge ' + (type === 'public' ? 'badge-success' : 'badge-primary')}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {location && (
                    <li>
                        {' '}
                        <i className='fas fa-map-marker'></i> {' '}{location}
                    </li>
                )}
                {webSite && (
                    <li>
                        {' '}
                        <i className='fas fa-globe'></i> {' '}<a href={webSite}> {webSite} </a>
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => setCurrent(hospital)}>
                    Edit
        </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
        </button>
            </p>
        </div>
    );
};

HospitalItem.protoTypes = {
    hospital: PropTypes.object.isRequired,
};

export default HospitalItem;
