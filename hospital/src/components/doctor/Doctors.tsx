import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DoctorItem from './DoctorItem';
import Spinner from '../layout/Spinner';
import DoctorContext from '../../context/doctor/doctorContext';

const Doctors = () => {
  const hospitalContext = useContext(DoctorContext);

  const { doctors, filtered, getDoctors, loading } = hospitalContext;

  useEffect(() => {
    getDoctors();
    // eslint-disable-next-line
  }, []);
  if (doctors !== null && doctors.length === 0) {
    return <h4>Please add a doctor</h4>;
  }
  return (
    <Fragment>
      {doctors !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((doctor) => (
                <CSSTransition key={doctor._id} timeout={500} classNames='item'>
                  <DoctorItem doctor={doctor} />
                </CSSTransition>
              ))
            : doctors.map((doctor) => (
                <CSSTransition key={doctor._id} timeout={500} classNames='item'>
                  <DoctorItem doctor={doctor} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Doctors;
