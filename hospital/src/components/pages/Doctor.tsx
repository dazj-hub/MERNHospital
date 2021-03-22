import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import DoctorFilter from '../doctor/DoctorFilter';
import DoctorForm from '../doctor/DoctorForm';
import Doctors from '../doctor/Doctors';

import HospitalState from '../../context/hospital/HospitalState';
import DoctorState from '../../context/doctor/DoctorState';


const Doctor = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, [])
  return (
    <HospitalState>
    <DoctorState>
      <div className='grid-2'>
        <div>
          <DoctorForm />
        </div>
        <div>
          <DoctorFilter />
          <Doctors />
        </div>
      </div>
    </DoctorState>
    </HospitalState>
  );
}

export default Doctor
