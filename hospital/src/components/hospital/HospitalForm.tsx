import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from '../../models/hospitals/hospital.model';

const HospitalForm = () => {
  const hospitalContext = useContext(HospitalContext);
  const { addHospital, clearCurrent, updateHospital, current } = hospitalContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setHospital(current);
    } else {
      setHospital({
        name: '',
        location: '',
        type: 'private',
        webSite: '',
      } as Hospital);
    }
  }, [hospitalContext, current]);
  const [hospital, setHospital] = useState({
    name: '',
    location: '',
    type: 'private',
    webSite: '',
  } as Hospital);
  const { name, location, type, webSite } = hospital;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHospital({ ...hospital, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || location === '' || type === '' || webSite === '') {
      setAlert('Please fill in all fields', 'danger', 5000);      
    }else{
    if (current === null) {
      addHospital(hospital);
    } else {
      updateHospital(hospital);
    }
    clearAll();

    }
  };
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Hospital' : 'Add New Hospital'}</h2>
      <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} autoComplete='off' />
      <input type='text' placeholder='Location' name='location' value={location} onChange={onChange} autoComplete='off' />
      <h5>Hospital Type</h5>
      <div className='grid-2'>
        <div>
          <input
            type='radio'
            name='type'
            value='private'
            checked={type === 'private'}
            onChange={onChange}
          />{' '}
        Private{' '}
        </div>
        <div>
          <input
            type='radio'
            name='type'
            value='public'
            checked={type === 'public'}
            onChange={onChange}
          />{' '}
        Public{' '}
        </div>
      </div>
      <input type='text' placeholder='Web Site URL' name='webSite' value={webSite} onChange={onChange} autoComplete='off' />
      <div>
        <input
          type='submit'
          value={current ? 'Update' : 'Add'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
            </button>
        </div>
      )}
    </form>
  );
};

export default HospitalForm;