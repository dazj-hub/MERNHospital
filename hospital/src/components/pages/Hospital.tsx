import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import HospitalFilter from '../hospital/HospitalFilter';
import HospitalForm from '../hospital/HospitalForm';
import Hospitals from '../hospital/Hospitals';

import HospitalState from '../../context/hospital/HospitalState';


const Hospital = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, [])
  return (
    <HospitalState>
      <div className='grid-2'>
        <div>
          <HospitalForm />
        </div>
        <div>
          <HospitalFilter />
          <Hospitals />
        </div>
      </div>
    </HospitalState>
  );
}

export default Hospital
