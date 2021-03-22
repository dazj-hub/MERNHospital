import { createContext } from 'react';
import { IUser } from '../../models/user/user.model';

type AuthContextType = {
  token: string;
  isAuthenticated: boolean;
  user: IUser;
  loading: boolean;
  error: string;
  register: (formData: any) => Promise<void>;
  loadUser: () => Promise<void>;
  login: (formData: any) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
};


const authContext = createContext<AuthContextType>({} as AuthContextType);

export default authContext;
