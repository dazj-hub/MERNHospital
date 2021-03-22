import {Express} from 'express';
import health_controller from './controllers/health.controller';
import user_controller from './controllers/user.controller';
import auth_controller from './controllers/auth.controller';
import doctor_controller from './controllers/doctor.controller';
import hospital_controller from './controllers/hospital.controller';

const routes = (app: Express): void => {
    app.use('/v1/health', health_controller);
    app.use('/v1/user', user_controller);
    app.use('/v1/auth', auth_controller);
    app.use('/v1/doctor', doctor_controller);
    app.use('/v1/hospital', hospital_controller);
};

export default routes;