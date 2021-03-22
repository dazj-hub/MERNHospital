import { createContext } from 'react';
import { Doctor } from '../../models/doctors/doctor.model';

type DoctorContextType = {
  doctors: Doctor[];
  current: Doctor;
  filtered: Doctor[];
  error: any;
  loading: Boolean
  getDoctors: () => Promise<void>;
  addDoctor: (doctor: Doctor) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;
  clearDoctors: () => void;
  setCurrent: (doctor: Doctor) => void;
  clearCurrent: () => void;
  updateDoctor: (doctor: Doctor) => Promise<void>;
  filterDoctors: (text: string) => void;
  clearFilter: () => void;
};

const doctorContext = createContext<DoctorContextType>({} as DoctorContextType);

export default doctorContext;