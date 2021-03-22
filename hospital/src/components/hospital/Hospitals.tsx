import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HospitalItem from './HospitalItem';
import Spinner from '../layout/Spinner';
import HospitalContext from '../../context/hospital/hospitalContext';

const Hospitals = () => {
  const hospitalContext = useContext(HospitalContext);

  const { hospitals, filtered, getHospitals, loading } = hospitalContext;

  useEffect(() => {
    getHospitals();
    // eslint-disable-next-line
  }, []);
  if (hospitals !== null && hospitals.length === 0) {
    return <h4>Please add an hospital</h4>;
  }
  return (
    <Fragment>
      {hospitals !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((hospital) => (
                <CSSTransition key={hospital._id} timeout={500} classNames='item'>
                  <HospitalItem hospital={hospital} />
                </CSSTransition>
              ))
            : hospitals.map((hospital) => (
                <CSSTransition key={hospital._id} timeout={500} classNames='item'>
                  <HospitalItem hospital={hospital} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Hospitals;
