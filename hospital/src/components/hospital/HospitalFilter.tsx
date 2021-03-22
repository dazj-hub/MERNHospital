import React, { useContext, useRef, useEffect } from 'react';
import HospitalContext from '../../context/hospital/hospitalContext';

const HospitalFilter = () => {
  const hospitalContext = useContext(HospitalContext);

  const text = useRef<any>('');

  const { filterHospitals, clearFilter, filtered } = hospitalContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text.current.value !== '') {
      filterHospitals(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input ref={text} type='text' placeholder='Filter Hospitals...' onChange={onChange} />
    </form>
  );
};

export default HospitalFilter;
