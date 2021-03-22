import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { props_nav } from '../../models/navbar/props_nav';


const Navbar = ({ tittle, icon }: props_nav) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  const onLogout = () => {
    logout();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <Link to='/hospital'>Hospital</Link>
      </li>
      <li>
        <Link to='/doctor'>Doctor</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {tittle}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  tittle: 'Hospital Control',
  icon: 'fas fa-h-square',
};

export default Navbar;