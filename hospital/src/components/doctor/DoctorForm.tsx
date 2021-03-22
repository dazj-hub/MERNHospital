import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import DoctorContext from '../../context/doctor/doctorContext';
import { Doctor } from '../../models/doctors/doctor.model';

import HospitalList from '../hospital/HospitalList';
import HospitalBox from '../hospital/HospitalBox';

const DoctorForm = () => {
  const doctorContext = useContext(DoctorContext);
  const { addDoctor, clearCurrent, updateDoctor, current } = doctorContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setDoctor(current);
      current.myHospitals !== null ? setShowHospitalBoxs(true) : setShowHospitalBoxs(false);      
    } else {
      setDoctor({
        firstName: '',
        lastName: '',
        email: '',
        speciality: '',
        myHospitals: [],
      } as Doctor);
      setShowHospitalBoxs(false);
    }
  }, [doctorContext, current]);
  const [doctor, setDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    speciality: '',
    myHospitals: [],
  } as Doctor);
  const { firstName, lastName, email, speciality, myHospitals } = doctor;
  const [showHospitalBoxs, setShowHospitalBoxs] = useState(false);

  const specialities = ['Acupuncture', 'Aerospace Medicine', 'Allergology',
    'Anesthesiology and Recovery', 'Dermatology', 'Emergency Medicine',
    'Endocrinology', 'Extracorporeal Medicine', 'Family and Community Medicine',
    'General Medicine', 'Gynecology and Obstetrics', 'Infectology', 'Internal Medicine',
    'Occupational Medicine', 'Orthopedics and Traumatology', 'Pathological Anatomy',
    'Pneumology', 'Radiology and medical imaging', 'Rheumatology', 'Urology'];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDoctor({ ...doctor, [e.target.name]: e.target.value });

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setDoctor({ ...doctor, [e.target.name]: e.target.value });

  const onChangeHospitals = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newHospitalId = e.target.value;
    let hospitalsDoctor: string[] = myHospitals;

    if (!hospitalsDoctor.includes(newHospitalId)) {
      hospitalsDoctor.push(newHospitalId);
      setDoctor({ ...doctor, [e.target.name]: hospitalsDoctor });
      setShowHospitalBoxs(true);      
    }
  }

  const deleteHospitalHandler = (index: number) => {
    myHospitals.splice(index, 1);
    setDoctor({ ...doctor, myHospitals: myHospitals });
    if (myHospitals.length === 0) {      
      setShowHospitalBoxs(false);
    }
  }

  const hospitalBox = (hospitalId: string, index: number) => {
    return <HospitalBox
      hospitalId={hospitalId}
      key={index}
      clicked={() => deleteHospitalHandler(index)} />
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || speciality === '' || myHospitals.length === 0) {
      setAlert('Please fill in all fields', 'danger', 5000);      
    } else {
      if (current === null) {
        addDoctor(doctor);
      } else {
        updateDoctor(doctor);
      }
      clearAll();      
    }
  };
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Doctor' : 'Add New Doctor'}</h2>
      <input type='text' placeholder='First Name' name='firstName' value={firstName} onChange={onChange} />
      <input type='text' placeholder='Last Name' name='lastName' value={lastName} onChange={onChange} />
      <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
      <select name='speciality' onChange={onChangeSelect} >
        <option disabled selected>Select a speciality</option>
        {specialities.map((item, index) => (
          <option value={item} key={index} selected={item === speciality}> {item} </option>
        ))}
      </select>
      <HospitalList name='myHospitals' handleChange={onChangeHospitals} />
      { showHospitalBoxs ? (
        <fieldset>
          <legend > Hospitals Selected </legend>
          {myHospitals.map((hospitalId: string, index: number) => hospitalBox(hospitalId, index))}
        </fieldset>
      ) : null}
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

export default DoctorForm;