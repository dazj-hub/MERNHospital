import g_intance from './generic_instance';

const setAuthToken = (token: string | null) => {
  if (token !== null) {
    g_intance.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete g_intance.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
