import React, { useContext, useRef, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';

const DoctorFilter = () => {
  const doctorContext = useContext(DoctorContext);

  const text = useRef<any>('');

  const { filterDoctors, clearFilter, filtered } = doctorContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text.current.value !== '') {
      filterDoctors(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input ref={text} type='text' placeholder='Filter Doctors...' onChange={onChange} />
    </form>
  );
};

export default DoctorFilter;
