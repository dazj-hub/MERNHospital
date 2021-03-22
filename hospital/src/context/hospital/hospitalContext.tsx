import { createContext } from 'react';
import { Hospital } from '../../models/hospitals/hospital.model';

type HospitalContextType = {
  hospitals: Hospital[];
  current: Hospital;
  filtered: Hospital[];
  error: any;
  loading: Boolean
  getHospitals: () => Promise<void>;
  getHospital: (id: string) => Promise<void>;
  addHospital: (hospital: Hospital) => Promise<void>;
  deleteHospital: (id: string) => Promise<void>;
  clearHospitals: () => void;
  setCurrent: (hospital: Hospital) => void;
  clearCurrent: () => void;
  updateHospital: (hospital: Hospital) => Promise<void>;
  filterHospitals: (text: string) => void;
  clearFilter: () => void;
};

const hospitalContext = createContext<HospitalContextType>({} as HospitalContextType);

export default hospitalContext;